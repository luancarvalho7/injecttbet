


import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';



import chooseSupplier from '../images/chooseSupplier.svg'
import { SupplierCard } from '../components/cards/supplierCard';

import logo from '../images/logo.png'
import arrow from '../images/chevron-right.svg'
import './home.css'
import { Nav } from '../components/nav/nav';




export function FornecedorCard({ data, setSGame }) {

    const location = useLocation();
  
    useEffect(() => {
      if (location.pathname === '/' && hasNavigatedAway.current) {
        // Only clear if we have navigated away before
        hasNavigatedAway.current = false; // Reset the flag
      }
    }, [location]);



    return <>
    
    <Nav />

        {/* Escolha o seu Fornecedor */}
        <section className='hSection'>

            <div className="miniSectionTitle marginSpacings"><img src={chooseSupplier} /><p className='mainText'>Escolha o Fornecedor</p></div>
            {
                <Swiper
                    slidesPerView={'auto'}
                    centeredSlides={false}
                    spaceBetween={16}
                    className="mySwiper"
                >
                    {data[0].suppliers.map((current, index) =>
                        <SwiperSlide key={index}>
                            <SupplierCard data={current} />
                        </SwiperSlide>
                    )}
                </Swiper>
            }
        </section>
    </>
}