"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import type { FormikHelpers } from "formik";
import { useMutation } from "@tanstack/react-query";
import { FiAlertCircle } from "react-icons/fi";
import * as Yup from "yup";
import { createBookingRequest } from "@/lib/api";
import type { BookingValues } from "@/types/camper";
import styles from "./BookingForm.module.css";

interface BookingFormProps {
  camperId: string;
}

const initialValues: BookingValues = {
  name: "",
  email: "",
};

const bookingSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Please enter your name.")
    .matches(/^[A-Za-zА-Яа-яЁёІіЇїЄє' -]+$/, "Please enter your name.")
    .required("Please enter your name."),

  email: Yup.string()
    .email("Please enter your email.")
    .required("Please enter your email."),
});

export default function BookingForm({ camperId }: BookingFormProps) {
  const bookingMutation = useMutation({
    mutationFn: (values: BookingValues) => {
      return createBookingRequest(camperId, values);
    },
  });

  function handleSubmit(
    values: BookingValues,
    actions: FormikHelpers<BookingValues>,
  ) {
    bookingMutation.mutate(values, {
      onSuccess: () => {
        actions.resetForm();
      },

      onSettled: () => {
        actions.setSubmitting(false);
      },
    });
  }

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>Book your campervan now</h2>

        <p className={styles.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={bookingSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <div className={styles.fieldWrapper}>
              <div className={styles.inputWrapper}>
                <Field
                  className={
                    errors.name && touched.name
                      ? `${styles.input} ${styles.inputError}`
                      : styles.input
                  }
                  id="booking-name"
                  type="text"
                  name="name"
                  placeholder="Name*"
                />

                {errors.name && touched.name && (
                  <>
                    <label className={styles.errorLabel} htmlFor="booking-name">
                      Name*
                    </label>

                    <FiAlertCircle className={styles.errorIcon} />
                  </>
                )}
              </div>

              <ErrorMessage
                className={styles.error}
                name="name"
                component="span"
              />
            </div>

            <div className={styles.fieldWrapper}>
              <div className={styles.inputWrapper}>
                <Field
                  className={
                    errors.email && touched.email
                      ? `${styles.input} ${styles.inputError}`
                      : styles.input
                  }
                  id="booking-email"
                  type="email"
                  name="email"
                  placeholder="Email*"
                />

                {errors.email && touched.email && (
                  <>
                    <label
                      className={styles.errorLabel}
                      htmlFor="booking-email"
                    >
                      Email*
                    </label>

                    <FiAlertCircle className={styles.errorIcon} />
                  </>
                )}
              </div>

              <ErrorMessage
                className={styles.error}
                name="email"
                component="span"
              />
            </div>

            <button
              className={styles.button}
              type="submit"
              disabled={bookingMutation.isPending}
            >
              {bookingMutation.isPending ? "Sending..." : "Send"}
            </button>
          </Form>
        )}
      </Formik>

      {bookingMutation.isSuccess && (
        <p className={styles.success}>Booking request sent successfully.</p>
      )}

      {bookingMutation.isError && (
        <p className={styles.requestError}>
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
