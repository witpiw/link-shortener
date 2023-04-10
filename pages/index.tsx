import { LinkList, Modal, Loading } from "../components";

import { Flex } from "@chakra-ui/react";
import { If, Then, Else } from "react-if";
import { useUser } from "@supabase/auth-helpers-react";

export default function Home() {
  const user = useUser();

  return (
    <Flex direction={"column"} justify={"center"} align={"center"} gap={15}>
      <div>
        <If condition={!!user}>
          <Then>
            <Flex direction={"column"} justify="center" align="center" gap={8}>
              <LinkList />
              <Modal />
            </Flex>
          </Then>
          <Else>
            <Loading />
          </Else>
        </If>
      </div>
    </Flex>
  );
}
