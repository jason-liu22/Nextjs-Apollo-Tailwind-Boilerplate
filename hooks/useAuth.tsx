import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMeQuery } from "generated/graphql";

export const useAuth = () => {
  const router = useRouter();
  const { data, loading } = useMeQuery();
  useEffect(() => {
    if (!loading && !data?.me) {
      router.push(`/login?next=${router.pathname}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);
};
