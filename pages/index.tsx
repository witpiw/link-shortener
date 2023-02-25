import EditableText from "../components/EditableText"

import { Heading, Flex } from "@chakra-ui/react";
import { useUser } from '@supabase/auth-helpers-react'

export default function Home() {
  const user = useUser()

	return (
    <>
        <Flex direction={"column"} justify={"center"}>
          <Heading>Link shortener</Heading>
          <div>Hi {user && <EditableText initialValue={user?.user_metadata.username}/>}</div>
        </Flex>
    </>
  )
}
