import LoginLayout, { authStatusType } from "@/components/layouts/LoginLayout";

import CommonLayout from "@/components/layouts/CommonLayout";

import { Photo as PhotoGraphqlType } from "@/__generated__/graphql";
import Photo from "@/pages/home/components/Photo";
import PageTitle from "@/components/PageTitle";
import { useSeeFeeds } from "./hooks/useSeeFeeds";

import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@insta-monorepo/design-system";
import { useState } from "react";

const Home = () => {
  const { data } = useSeeFeeds();
  const [open, setOpen] = useState(true);

  return (
    <LoginLayout authStatus={authStatusType.NEED_LOGIN}>
      <CommonLayout>
        <PageTitle title="Home" />
        <ul>
          {data?.seeFeeds?.map((photo: PhotoGraphqlType) => (
            <Photo key={photo.id} photo={photo} />
          ))}
        </ul>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalHeader>ModalHeader</ModalHeader>
          <ModalContent>ModalContent</ModalContent>
          <ModalFooter>ModalFooter</ModalFooter>
        </Modal>
      </CommonLayout>
    </LoginLayout>
  );
};

export default Home;
