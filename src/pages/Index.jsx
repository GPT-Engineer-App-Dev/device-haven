import { Container, Box, Image, Text, VStack, Heading, SimpleGrid, Stack, Badge, Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const sampleProducts = [
  {
    id: 1,
    name: "Smartphone XYZ",
    description: "A high-end smartphone with a sleek design and powerful features.",
    price: "$799",
    category: "Electronics",
    rating: 4.5,
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Laptop ABC",
    description: "A lightweight laptop with excellent performance and battery life.",
    price: "$1199",
    category: "Computers",
    rating: 4.7,
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Wireless Headphones",
    description: "Noise-cancelling wireless headphones with superior sound quality.",
    price: "$199",
    category: "Accessories",
    rating: 4.2,
    imageUrl: "https://via.placeholder.com/150"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery);
    const matchesPriceFilter = priceFilter ? product.price.replace('$', '') <= parseFloat(priceFilter) : true;
    const matchesCategoryFilter = categoryFilter ? product.category.toLowerCase().includes(categoryFilter.toLowerCase()) : true;
    const matchesRatingFilter = ratingFilter ? product.rating >= parseFloat(ratingFilter) : true;
    return matchesSearchQuery && matchesPriceFilter && matchesCategoryFilter && matchesRatingFilter;
  });

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">Welcome to Electronics Store</Heading>
        <Text fontSize="xl" textAlign="center">Find the best electronics at unbeatable prices.</Text>
        <InputGroup mb={6}>
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </InputGroup>
        <InputGroup mb={6}>
          <Input
            type="text"
            placeholder="Filter by price..."
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          />
        </InputGroup>
        <InputGroup mb={6}>
          <Input
            type="text"
            placeholder="Filter by category..."
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          />
        </InputGroup>
        <InputGroup mb={6}>
          <Input
            type="text"
            placeholder="Filter by rating..."
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          />
        </InputGroup>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {filteredProducts.map(product => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
              <Image src={product.imageUrl} alt={product.name} />
              <Stack mt={4} spacing={2}>
                <Heading as="h3" size="md">{product.name}</Heading>
                <Text>{product.description}</Text>
                <Badge colorScheme="green" fontSize="1em">{product.price}</Badge>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;