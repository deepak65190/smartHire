import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Input as ChakraInput, Button, FormErrorMessage } from "@chakra-ui/react";
import { addTodo } from "./redux/action_type";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  FormControl,
  Textarea
} from "@chakra-ui/react";

const InputComponent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useDispatch();

  const validate = () => {
    let isValid = true;
    if (title.trim() === "") {
      setTitleError("Title is required");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (content.trim() === "") {
      setContentError("Content is required");
      isValid = false;
    } else {
      setContentError("");
    }

    return isValid;
  };

  const handleAdd = () => {
    if (!validate()) return;

    const todoData = {
      title: title.trim(),
      content: content.trim(),
      id: new Date().getMilliseconds() + title,
    };
    dispatch(addTodo(todoData));
    setTitle("");
    setContent("");
    onClose();
  };

  return (
    <>
      <Box
        height="60px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="10px"
      >
        <Button colorScheme="teal" width={{ base: "100%", md: "lg" }} borderRadius="10px" onClick={onOpen}>
          Add Notes
        </Button>
      </Box>

      <Modal
        initialFocusRef={initialRef}
        finalRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your Notes</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={titleError !== ""}>
              <FormLabel>Title</FormLabel>
              <ChakraInput
                ref={initialRef}
                placeholder="Title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              {titleError && <FormErrorMessage>{titleError}</FormErrorMessage>}
            </FormControl>

            <FormControl mt={4} isRequired isInvalid={contentError !== ""}>
              <FormLabel>Content</FormLabel>
              <Textarea
                placeholder="Content"
                value={content}
                required
                onChange={(e) => setContent(e.target.value)}
              />
              {contentError && <FormErrorMessage>{contentError}</FormErrorMessage>}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAdd}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InputComponent;
