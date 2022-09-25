import React from 'react';
import prismaClient from '../../lib/prismaClient';


const Link = ({ link }) => {


  return (
    <div>
      <div className="prose container mx-auto px-8">
        <button
          onClick={() => {}}
          className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
        >
           <span>Bookmark</span>
        </button>
        <h1>{link.title}</h1>
        <img src={link.imageUrl} className="shadow-lg rounded-lg" />
        <p>{link.description}</p>
        <a className="text-blue-500" href={`${link.url}`}>
          {link.url}
        </a>
      </div>
    </div>
  );
};

export default Link;

export const getServerSideProps = async ({ params }) => {
  const id = params.id;
  const link = await prismaClient.link.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      category: true,
      url: true,
      imageUrl: true,
      description: true,
    },
  });
  return {
    props: {
      link,
    },
  };
};