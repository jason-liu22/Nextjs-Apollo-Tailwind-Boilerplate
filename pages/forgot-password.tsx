import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MeDocument, useForgotPasswordMutation } from "generated/graphql";
import { Layout } from "components/Layout";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [completed, setCompleted] = useState(false);
  return (
    <>
      <Head>
        <title>Forgot Password?</title>
        <meta name="description" content="Login Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Forgot password?
              </h2>
            </div>
            {completed ? (
              <p className="text-teal-600 text-sm text-center">
                If an account with that email exists, an email is sent.
              </p>
            ) : (
              <Formik
                initialValues={{ email: "" }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await forgotPassword({
                    variables: values,
                  });
                  if (!response.data?.forgotPassword) {
                    setErrors({ email: "User does not exist" });
                  } else {
                    setCompleted(true);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="mt-8 space-y-6">
                    <div className="flex flex-col space-y-2">
                      <Field
                        type="email"
                        name="email"
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email"
                        required
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-red-600 text-xs"
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={isSubmitting}
                      >
                        {isSubmitting && (
                          <svg
                            className="animate-spin h-5 w-5 mr-3 text-white"
                            viewBox="0 0 24 24"
                          />
                        )}
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ForgotPassword;
