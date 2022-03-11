import { Fragment } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { MeDocument, useLogoutMutation, useMeQuery } from "generated/graphql";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const { loading, data } = useMeQuery();
  const [userLogout, { loading: logoutLoading }] = useLogoutMutation();
  let body;
  if (loading) {
    body = null;
  } else if (data?.me) {
    body = (
      <Fragment>
        <p className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
          {data.me.username}
        </p>
        <button
          type="button"
          className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          onClick={() => {
            userLogout({ refetchQueries: [{ query: MeDocument }] });
          }}
          disabled={logoutLoading}
        >
          {logoutLoading && (
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24" />
          )}
          Logout
        </button>
      </Fragment>
    );
  } else {
    body = (
      <Fragment>
        <NextLink href="/login">
          <a className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
            Sign in
          </a>
        </NextLink>
        <NextLink href="/register">
          <a className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            Sign up
          </a>
        </NextLink>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <NextLink href="/" passHref>
                      <a>
                        <Image
                          width={32}
                          height={32}
                          className="h-8 w-8"
                          src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                          alt="logo"
                        />
                      </a>
                    </NextLink>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      <NextLink href="/create-post">
                        <a
                          className={classNames(
                            "active" === "active"
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current="page"
                        >
                          Create Post
                        </a>
                      </NextLink>
                    </div>
                  </div>
                </div>
                {data?.me ? (
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <Image
                              width={32}
                              height={32}
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt="logo"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <NextLink href="/profile">
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    My Profile
                                  </a>
                                </NextLink>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <NextLink href="/setting">
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Setting
                                  </a>
                                </NextLink>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Logout
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                ) : (
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <NextLink href="/login">
                        <a
                          className={classNames(
                            "active" === "active"
                              ? "bg-gray-900 text-white mr-5"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current="page"
                        >
                          Login
                        </a>
                      </NextLink>
                      <NextLink href="/register">
                        <a
                          className={classNames(
                            "active" === "active"
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current="page"
                        >
                          Register
                        </a>
                      </NextLink>
                    </div>
                  </div>
                )}
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <NextLink href="/create-post" passHref>
                  <Disclosure.Button
                    as="a"
                    className={classNames(
                      "active" === "active"
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current="page"
                  >
                    Create Post
                  </Disclosure.Button>
                </NextLink>
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                {data?.me ? (
                  <>
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <Image
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full"
                          src={user.imageUrl}
                          alt="user_avatar"
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {user.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {user.email}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                      <NextLink href="/profile" passHref>
                        <Disclosure.Button
                          as="a"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                        >
                          My profile
                        </Disclosure.Button>
                      </NextLink>
                      <NextLink href="/profile" passHref>
                        <Disclosure.Button
                          as="a"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                        >
                          Setting
                        </Disclosure.Button>
                      </NextLink>
                      <Disclosure.Button
                        as="a"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        Logout
                      </Disclosure.Button>
                    </div>
                  </>
                ) : (
                  <div className="mt-3 px-2 space-y-1">
                    <NextLink href="/" passHref>
                      <Disclosure.Button
                        as="a"
                        className={classNames(
                          "active" === "active"
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block px-3 py-2 rounded-md text-base font-medium text-center"
                        )}
                        aria-current="page"
                      >
                        Login
                      </Disclosure.Button>
                    </NextLink>
                    <NextLink href="/" passHref>
                      <Disclosure.Button
                        as="a"
                        className={classNames(
                          "active" === "active"
                            ? "bg-gray-900 text-white text-center"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block px-3 py-2 rounded-md text-base font-medium text-center"
                        )}
                        aria-current="page"
                      >
                        Register
                      </Disclosure.Button>
                    </NextLink>
                  </div>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </Fragment>
  );
};

export default NavBar;
