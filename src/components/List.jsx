import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  useDisclosure,
  useToast,
  Box,
  List as ChakraList,
  ListItem,
  IconButton,
  Text,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { deleteTodo, editTodo } from "./redux/action_type";
import Pagination from './Pagination'; 

const List = () => {
  const data = useSelector((state) => state.todo);
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState("");
  const [details, setDetails] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  //filter data
  const filteredData = data.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const openEditModal = (el) => {
    onEditOpen();
    setTitle(el.title);
    setContent(el.content);
    setId(el.id);
  };

  const openDetailModal = (el) => {
    setDetails(el);
    onDetailOpen();
  };

  const handleEdit = () => {
    dispatch(editTodo({ id, title, content }));
    toast({
      title: "Todo updated",
      description: "Todo updated successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    onEditClose();
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    toast({
      title: "Todo deleted",
      description: "Todo deleted successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      <FormControl mb={4}>
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </FormControl>
      <ChakraList spacing={3}>
        {currentItems.length > 0 &&
          currentItems.map((el) => (
            <ListItem
              key={el.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
              borderRadius="10px"
              padding="10px"
            >
              <Text>{el.title}</Text>
              <Box>
                <Button size="sm" mr={2} onClick={() => openDetailModal(el)}>
                  More...
                </Button>
                <IconButton
                  aria-label="Edit Todo"
                  icon={<EditIcon />}
                  size="sm"
                  onClick={() => openEditModal(el)}
                  mr={2}
                />
                <IconButton
                  aria-label="Delete Todo"
                  icon={<DeleteIcon />}
                  size="sm"
                  onClick={() => handleDelete(el.id)}
                />
              </Box>
            </ListItem>
          ))}
      </ChakraList>

      {/* Pagination */}
      <Box mt={"20px"}>
        {data.length>10?<Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />:""}
      
      </Box>

      {/* Edit Modal */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isEditOpen}
        onClose={onEditClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={4}>
              <Input
                ref={initialRef}
                placeholder="Title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Textarea
                placeholder="Content"
                value={content}
                required
                onChange={(e) => setContent(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEdit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Detail Modal */}
      <Modal
        isOpen={isDetailOpen}
        onClose={onDetailClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Todo Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box mb={4}>
              <Text fontWeight="bold">Title:</Text>
              <Text>{details.title || ""}</Text>
            </Box>
            <Box mb={4}>
              <Text fontWeight="bold">Content:</Text>
              <Text>{details.content || ""}</Text>
            </Box>
            <Flex mb={4} justify="space-between">
              <Box>
                <Text fontWeight="bold">Created At:</Text>
                <Text>{details.timeStamp?.created || ""}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Updated At:</Text>
                <Text>{details.timeStamp?.updated || ""}</Text>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onDetailClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default List;
