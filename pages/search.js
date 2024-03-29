import { useRouter } from 'next/router'
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import {format} from "date-fns";
import InfoCard from '../components/InfoCard';
function Search({searchResults}) {
    const router = useRouter();

    //es6 destructureing 
    const {location, startDate, endDate, 
    noOfGuests} = router.query;

       //const formattedStartDate=  format(new Date(startDate), "dd MMMM yy")
       const formattedStartDate = format(new Date (startDate), "dd MMM yy")
       const formattedEndDate=  format(new Date(endDate), "dd MMMM yy")
       const range = `${formattedStartDate} - ${formattedEndDate}`;
    



  return (
    <div>
       <Header placeholder= {`${location} | ${range} | ${noOfGuests} guests`}/>
       <main className=' flex mb-5 
       text-gray-800 whitespace-nowrap '>
        <section className='flex-grow pt-14 px-6  '>
            <p className='text-xs '>300+ stays - {range} - for {noOfGuests} guests </p>
            <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}
            </h1>

            <div className='flex space-x-3'>
                <p className='button'>Cancellation flexibility</p>
                <p className='button'>Type of Place</p>
                <p className='button'>Price</p>
                <p className='button'>Rooms and Beds</p>
                <p className='button'>More filters</p>
            </div>


            <div className='flex flex-col'>
            {searchResults.map(
                ({img, location, title, description, star, price, total}) =>(
            <InfoCard
            key = {img}
            img = {img}
            location = {location}
            title = {title}
            description = {description}
            star = {star}
            price = {price}
            total = {total}
            />
              

           
            
            ))}

            </div>



            
        </section>

       </main>

       <Footer/>
    </div>
  )
}

export default Search; 

export async function getServerSideProps() {
    const searchResults = await fetch("https://links.papareact.com/isz")
    .then(res => res.json());

    return {
        props:{
            searchResults,
        },
    };

}