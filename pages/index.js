import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Footer from 'components/Footer';
import Newslatter from 'components/Newslatter';
import ResourceHighLight from 'components/ResourceHighLight';
import ResourceList from 'components/ResourceList';
import Layout from 'components/Layout';
// import RESOURCES from 'api/data';

export default function Home({RESOURCES}) {

  // console.log(props);//para leer lo que viene de getStaticProps

      // useEffect(()=>{
      //   fetch('http://localhost:3001/api/resources');
      // },[]);

  return (
    <Layout>

      <ResourceHighLight 
        RESOURCES={RESOURCES.slice(0,2)}
      />
      <Newslatter />
      <ResourceList 
        RESOURCES={RESOURCES.slice(2)}
      />
      {/* {JSON.stringify(RESOURCES)} */}
      <Footer />

    </Layout>
  )
}

//se manda a llamar c/vez que se visita la pág, la f se ejecuta en el sevidor. Los datos siempre serán "frescos"
export const getServerSideProps=async ()=>{
  const respuesta=await fetch(`${process.env.API_URL}/resources`);
  const resultado=await respuesta.json();

  return {
    props: {
      RESOURCES: resultado
    }
  }
};

//Se manda a llamar sólo en el proceso de construcción, por lo que sólo se ejecuta una vez. Se puede añadir una funcionalidad
//para que la pág cargue los datos más actualizados, pero no es tan rápida como getServerSideProps
// export const getStaticProps=async ()=>{
//   const respuesta=await fetch('http://localhost:3000/api/resources');
//   const resultado=await respuesta.json();

//   return {
//     props: {
//       RESOURCES: resultado
//     }
//   }
// };

