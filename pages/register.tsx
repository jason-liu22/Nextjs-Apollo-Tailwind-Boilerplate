import React from "react";
import Head from "next/head";
// import Image from "next/image";
import { useRouter } from "next/router";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MeDocument, useRegisterMutation } from "generated/graphql";
import { toErrorMap } from "utils/toErrorMap";
import { Layout } from "components/Layout";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [userRegister] = useRegisterMutation();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              {/* <Image
              className="h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              width="100"
              height="100"
              alt="Workflow"
            /> */}
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign up your account
              </h2>
            </div>
            <Formik
              initialValues={{ username: "", email: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await userRegister({
                  variables: { options: values },
                  refetchQueries: [{ query: MeDocument }],
                });
                if (response.data?.register.errors) {
                  setErrors(toErrorMap(response.data.register.errors));
                } else {
                  router.push("/");
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="mt-8 space-y-6">
                  <div className="flex flex-col space-y-2">
                    <Field
                      type="text"
                      name="username"
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Username"
                      required
                    />
                    <ErrorMessage
                      name="username"
                      component="p"
                      className="text-red-600 text-xs"
                    />
                    <Field
                      type="text"
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
                    <Field
                      type="password"
                      name="password"
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-600 text-xs"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled={isSubmitting}
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon
                          className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                          aria-hidden="true"
                        />
                      </span>
                      Sign Up
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Register;
