import { useState } from "react";

import { getAuth } from "firebase/auth";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

import { Formik, Form, Field, ErrorMessage, FormikValues } from "formik";
import * as Yup from "yup";

import "./Auth.scss";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

// Form objects
const loginData: FormikValues = {
  email: "",
  password: "",
};
const registerData: FormikValues = {
  fname: "",
  lname: "",
  email: "",
  password: "",
};
// END

// Validation Schemas
const signInSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password is too short - should be 4 chars minimum"),
});
const signUpSchema = Yup.object().shape({
  fname: Yup.string().required("Firstname is required"),
  lname: Yup.string().required("Lastname is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password is too short - should be 4 chars minimum"),
});
// END

const Auth = () => {
  const auth = getAuth();

  const [formState, setFormState] = useState(1);
  const [
    createUserWithEmailAndPassword,
    newUser,
    signUpLoading,
    signUpError
  ] = useCreateUserWithEmailAndPassword(auth);
  const [
    signInWithEmailAndPassword,
    user,
    signInLoading,
    signInError
  ] = useSignInWithEmailAndPassword(auth);

  const SignUp = async (data: FormikValues) => {
    createUserWithEmailAndPassword(data.email, data.password);
  };
  const SignIn = async (data: FormikValues) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <section className="Auth py-[50px]">
      <div className="container mx-auto px-3">
        <div className="Auth__tab">
          <ul className="Auth__tabNav">
            <li className="Auth__tabNavItem">
              <button
                type="button"
                className={`Auth__tabNavButton ${formState === 1 ? "bg-[#10b981] text-white" : ""}`}
                onClick={() => setFormState(1)}
              >
                Login
              </button>
            </li>
            <li className="Auth__tabNavItem">
              <button
                type="button"
                className={`Auth__tabNavButton ${formState === 2 ? "bg-[#10b981] text-white" : ""}`}
                onClick={() => setFormState(2)}
              >
                Register
              </button>
            </li>
          </ul>

          {formState === 1 && (
            <div className="Auth__tabBody">
              <Formik
                initialValues={loginData}
                validationSchema={signInSchema}
                onSubmit={(value) => SignIn(value)}
              >
                {(formik) => {
                  const { errors, touched } = formik;
                  return (
                    <Form className="Auth__form credential">
                      <div className="credential__formGrp mb-4">
                        <Field
                          type="text"
                          name="email"
                          className={`credential__input ${
                            errors.email && touched.email ? "isError" : ""
                          }`}
                          placeholder="Email"
                        />
                        <ErrorMessage name="email" component="span" className="error" />
                      </div>

                      <div className="credential__formGrp mb-4">
                        <Field
                          type="password"
                          name="password"
                          className={`credential__input ${
                            errors.password && touched.password ? "isError" : ""
                          }`}
                          placeholder="Password"
                        />
                        <ErrorMessage name="password" component="span" className="error" />
                      </div>

                      <div className="credential__btnGrp w-full flex">
                        <button type="submit" className="btn btn__primary ml-auto" disabled={signInLoading}>
                          {signInLoading && (
                            <AiOutlineLoading3Quarters
                              size={"20px"}
                              className="animate-spin mr-2"
                            />
                          )}
                          Login
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          )}

          {formState === 2 && (
            <div className="Auth__tabBody">
              <Formik
                initialValues={registerData}
                validationSchema={signUpSchema}
                onSubmit={(value) => SignUp(value)}
              >
                {(formik) => {
                  const { errors, touched } = formik;

                  return (
                    <Form className="Auth__form credential">
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="credential__formGrp">
                          <Field
                            type="text"
                            name="fname"
                            className={`credential__input ${
                              errors.fname && touched.fname ? "isError" : ""
                            }`}
                            placeholder="Firstname"
                          />
                          <ErrorMessage name="fname" component="span" className="error" />
                        </div>
                        <div className="credential__formGrp">
                          <Field
                            type="text"
                            name="lname"
                            className={`credential__input ${
                              errors.lname && touched.lname ? "isError" : ""
                            }`}
                            placeholder="Lastname"
                          />
                          <ErrorMessage name="lname" component="span" className="error" />
                        </div>
                      </div>

                      <div className="credential__formGrp mb-4">
                        <Field
                          type="text"
                          name="email"
                          className={`credential__input ${
                            errors.email && touched.email ? "isError" : ""
                          }`}
                          placeholder="Email"
                        />
                        <ErrorMessage name="email" component="span" className="error" />
                      </div>

                      <div className="credential__formGrp mb-4">
                        <Field
                          type="password"
                          name="password"
                          className={`credential__input ${
                            errors.password && touched.password ? "isError" : ""
                          }`}
                          placeholder="Password"
                        />
                        <ErrorMessage name="password" component="span" className="error" />
                      </div>

                      <div className="credential__btnGrp w-full flex">
                        <button type="submit" className="btn btn__primary ml-auto" disabled={signUpLoading}>
                          {signUpLoading && (
                            <AiOutlineLoading3Quarters
                              size={"20px"}
                              className="animate-spin mr-2"
                            />
                          )}
                          Register
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Auth;
