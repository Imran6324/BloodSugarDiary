import React, {useState} from 'react';
import {BsFillArrowUpCircleFill} from 'react-icons/bs';
import styled from 'styled-components';

const ScrollButton = () =>{

const [visible, setVisible] = useState(false)

const toggleVisible = () => {
	const scrolled = document.documentElement.scrollTop;
	if (scrolled > 300){
	setVisible(true)
	}
	else if (scrolled <= 300){
	setVisible(false)
	}
};

const scrollToTop = () =>{
	window.scrollTo({
	top: 0,
	behavior: 'smooth'
	/* you can also use 'auto' behaviour
		in place of 'smooth' */
	});
};

window.addEventListener('scroll', toggleVisible);

return (
	<SButton>
	<BsFillArrowUpCircleFill onClick={scrollToTop}
	style={{display: visible ? 'inline' : 'none'}} />
	</SButton>
);
}

export default ScrollButton;

const SButton = styled.div`
position: fixed;
width: 100%;
left: 45%;
bottom: 50px;
height: 20px;
font-size: 2.1rem;
z-index: 1;
cursor: pointer;
color: #0098e3;
@media only screen and (max-width: 767px) {
	left: 43%;
}
`
