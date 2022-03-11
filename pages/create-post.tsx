import React from "react";
import Head from "next/head";
// import Image from "next/image";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { PostsDocument, useCreatePostMutation } from "generated/graphql";
import { useAuth } from "hooks/useAuth";
import { Layout } from "components/Layout";
import { toErrorMap } from "utils/toErrorMap";

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = ({}) => {
  useAuth();
  const [createPost] = useCreatePostMutation();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Create Post</title>
        <meta name="description" content="Create Post" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create Post
              </h2>
            </div>
            <Formik
              initialValues={{ title: "", text: "" }}
              onSubmit={async (values, { setErrors }) => {
                const { data } = await createPost({
                  variables: { input: values },
                  //   refetchQueries: [
                  //     { query: PostsDocument, variables: { limit: 5 } },
                  //   ],
                  //   update: (cache) => {
                  //     cache.evict({ fieldName: "posts:{}" });
                  //   },
                });
                if (data?.createPost.errors) {
                  setErrors(toErrorMap(data.createPost.errors));
                } else if (data?.createPost.post) {
                  router.push("/");
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="mt-8 space-y-6">
                  <div className="flex flex-col space-y-2">
                    <Field
                      type="text"
                      name="title"
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Title"
                    />
                    <ErrorMessage
                      name="title"
                      component="p"
                      className="text-red-600 text-xs"
                    />
                    <Field
                      as="textarea"
                      rows={5}
                      name="text"
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Text"
                    />
                    <ErrorMessage
                      name="text"
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
                      Create Post
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

export default CreatePost;
