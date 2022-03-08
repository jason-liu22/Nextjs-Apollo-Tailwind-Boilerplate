import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MeDocument, useChangePasswordMutation } from "generated/graphql";
import { toErrorMap } from "utils/toErrorMap";

interface ChangePasswordProps {}

const ChangePassword: React.FC<ChangePasswordProps> = ({}) => {
  const router = useRouter();
  const token = router.query.token as string;
  const [tokenError, setTokenError] = useState("");
  const [changePassword] = useChangePasswordMutation();
  return (
    <>
      <Head>
        <title>Change Password</title>
        <meta name="description" content="Login Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Change Password
            </h2>
          </div>
          <Formik
            initialValues={{ newPassword: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await changePassword({
                variables: {
                  newPassword: values.newPassword,
                  token,
                },
                refetchQueries: [{ query: MeDocument }],
              });
              if (response.data?.changePassword.errors) {
                const errorMap = toErrorMap(
                  response.data?.changePassword.errors
                );
                if ("token" in errorMap) {
                  setTokenError(errorMap.token);
                }
                setErrors(errorMap);
              } else if (response.data?.changePassword.user) {
                router.push("/");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8 space-y-6">
                <div className="flex flex-col space-y-2">
                  <Field
                    type="text"
                    name="newPassword"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="New Password"
                    required
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="p"
                    className="text-red-600 text-xs"
                  />
                  {tokenError && (
                    <p className="text-red-600 text-xs">{tokenError}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isSubmitting}
                  >
                    Change Password
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
