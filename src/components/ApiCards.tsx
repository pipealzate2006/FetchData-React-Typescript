import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image, Spinner } from "@nextui-org/react";
import { ApiResponse } from "./../types";

const ApiCards = () => {
  const [dataApi, setDataApi] = useState<ApiResponse | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ApiResponse["results"]>([]);

  useEffect(() => {
    const filtered =
      dataApi?.results?.filter(
        (card) =>
          card.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
          card.species.toLowerCase().includes(search.toLocaleLowerCase()) ||
          card.gender.toLowerCase().includes(search.toLocaleLowerCase())
      ) || [];
    setFilter(filtered);
  }, [search, dataApi]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      setDataApi(data);
    };
    fetchData();
  }, []);

  if (!dataApi || !dataApi.results) {
    return (
      <Spinner
        color="warning"
        className="flex justify-center items-center min-h-screen"
      />
    );
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        className="border-1 rounded-lg p-2 mx-5 my-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filter.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-5">
          {filter.map((card) => (
            <Card className="py-4" key={card.id}>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{card.name}</p>
                <small className="text-default-500">{card.species}</small>
                <h4 className="font-bold text-large">{card.gender}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={card.image}
                  width={270}
                />
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <h1 className="flex justify-center items-center text-4xl font-bold">
          Sin resultados
        </h1>
      )}
    </>
  );
};

export default ApiCards;
