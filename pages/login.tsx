import React from "react";
import Head from "next/head";
import NextLink from "next/link";
// import Image from "next/image";
import { useRouter } from "next/router";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MeDocument, MeQuery, useLoginMutation } from "generated/graphql";
import { toErrorMap } from "utils/toErrorMap";
import { Layout } from "components/Layout";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [userLogin] = useLoginMutation();
  // {
  // update(cache, { data }) {
  //   cache.modify({
  //     fields: {
  //       me(meData) {
  //         console.log(meData, data);
  //       },
  //     },
  //   });
  // },
  // }
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login Page" />
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
                Sign In
              </h2>
            </div>
            <Formik
              initialValues={{ usernameOrEmail: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await userLogin({
                  variables: values,
                  update: (cache, { data }) => {
                    // const meData = cache.readQuery<MeQuery>({
                    //   query: MeDocument,
                    // });
                    cache.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                        me: data?.login.user,
                      },
                    });
                  },
                });
                if (response.data?.login.errors) {
                  setErrors(toErrorMap(response.data.login.errors));
                } else if (response.data?.login.user) {
                  if (typeof router.query.next === "string") {
                    router.push(router.query.next);
                  } else {
                    router.push("/");
                  }
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="mt-8 space-y-6">
                  <div className="flex flex-col space-y-2">
                    <Field
                      type="text"
                      name="usernameOrEmail"
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Username or Email"
                      required
                    />
                    <ErrorMessage
                      name="usernameOrEmail"
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
                      <NextLink href="/forgot-password">
                        <a className="font-medium text-indigo-600 hover:text-indigo-500">
                          Forgot your password?
                        </a>
                      </NextLink>
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
                      Sign in
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

export default Login;
