"use client";

import { useId } from "react";
import { Field, Form, Formik } from "formik";
import { CiLocationOn } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import type { CamperFilters } from "@/types/camper";
import styles from "./FilterForm.module.css";

interface FilterFormProps {
  onSearch: (filters: CamperFilters) => void;
}

const initialValues: CamperFilters = {
  location: "",
  form: "",
  engine: "",
  transmission: "",
};

export default function FilterForm({ onSearch }: FilterFormProps) {
  const fieldId = useId();

  function handleSubmit(values: CamperFilters) {
    onSearch(values);
  }

  function handleClear() {
    onSearch(initialValues);
  }

  return (
    <aside className={styles.panel}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <label
            className={styles.locationLabel}
            htmlFor={`${fieldId}-location`}
          >
            Location
          </label>

          <span className={styles.inputWrapper}>
            <CiLocationOn className={styles.locationIcon} />

            <Field
              className={styles.locationInput}
              id={`${fieldId}-location`}
              name="location"
              type="text"
              placeholder="City"
            />
          </span>

          <h2 className={styles.title}>Filters</h2>

          <fieldset className={styles.group}>
            <legend className={styles.legend}>Camper form</legend>

            <label className={styles.radioLabel} htmlFor={`${fieldId}-alcove`}>
              <Field
                id={`${fieldId}-alcove`}
                name="form"
                type="radio"
                value="alcove"
              />
              Alcove
            </label>

            <label
              className={styles.radioLabel}
              htmlFor={`${fieldId}-panel-van`}
            >
              <Field
                id={`${fieldId}-panel-van`}
                name="form"
                type="radio"
                value="panel_van"
              />
              Panel Van
            </label>

            <label
              className={styles.radioLabel}
              htmlFor={`${fieldId}-integrated`}
            >
              <Field
                id={`${fieldId}-integrated`}
                name="form"
                type="radio"
                value="integrated"
              />
              Integrated
            </label>

            <label
              className={styles.radioLabel}
              htmlFor={`${fieldId}-semi-integrated`}
            >
              <Field
                id={`${fieldId}-semi-integrated`}
                name="form"
                type="radio"
                value="semi_integrated"
              />
              Semi Integrated
            </label>
          </fieldset>

          <fieldset className={styles.group}>
            <legend className={styles.legend}>Engine</legend>

            <label className={styles.radioLabel} htmlFor={`${fieldId}-diesel`}>
              <Field
                id={`${fieldId}-diesel`}
                name="engine"
                type="radio"
                value="diesel"
              />
              Diesel
            </label>

            <label className={styles.radioLabel} htmlFor={`${fieldId}-petrol`}>
              <Field
                id={`${fieldId}-petrol`}
                name="engine"
                type="radio"
                value="petrol"
              />
              Petrol
            </label>

            <label className={styles.radioLabel} htmlFor={`${fieldId}-hybrid`}>
              <Field
                id={`${fieldId}-hybrid`}
                name="engine"
                type="radio"
                value="hybrid"
              />
              Hybrid
            </label>

            <label
              className={styles.radioLabel}
              htmlFor={`${fieldId}-electric`}
            >
              <Field
                id={`${fieldId}-electric`}
                name="engine"
                type="radio"
                value="electric"
              />
              Electric
            </label>
          </fieldset>

          <fieldset className={styles.group}>
            <legend className={styles.legend}>Transmission</legend>

            <label
              className={styles.radioLabel}
              htmlFor={`${fieldId}-automatic`}
            >
              <Field
                id={`${fieldId}-automatic`}
                name="transmission"
                type="radio"
                value="automatic"
              />
              Automatic
            </label>

            <label className={styles.radioLabel} htmlFor={`${fieldId}-manual`}>
              <Field
                id={`${fieldId}-manual`}
                name="transmission"
                type="radio"
                value="manual"
              />
              Manual
            </label>
          </fieldset>

          <button className={styles.searchButton} type="submit">
            Search
          </button>

          <button
            className={styles.clearButton}
            type="reset"
            onClick={handleClear}
          >
            <IoCloseOutline />
            Clear filters
          </button>
        </Form>
      </Formik>
    </aside>
  );
}
