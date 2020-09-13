import React from 'react'
import '../ui/Footer.css'

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-logo'>
                <div>
                    <img className='nav-adtelligent-logo' src={require('.././images/adtelligent-logo.png')}/>
                    <strong style={{color: 'white', fontSize: '30px', marginLeft: '-15px', fontFamily: 'Comfortaa, cursive'}}>dtelligent</strong>
                </div>
                <p style={{color: 'white'}}>+1 (876) 616-8756</p>
                <p style={{color: 'white'}}>+1 (876) 521-5739</p>
            </div>
            <div className='footer-links'>
                <h5 style={{fontSize: '20px', color: 'white', fontWeight:'500'}}>Links</h5>
                <p>Projects</p>
                <p>About Us</p>
                <p>Contact</p>
            </div>
            <div className='footer-services'>
                <p style={{fontSize: '20px', color: 'white', fontWeight:'500'}}>Services</p>
                <div className='footer-services-list'>
                    <p>Marketing Strategy</p>
                    <p>Video Production</p>
                    <p>Web Development</p>
                    <p>Design and Animation</p>
                    <p>Data Analytics</p>
                    <p>Photography</p>
                    <p>Social Media Management</p>
                </div>
            </div>

            <div style={{marginTop:'-3rem'}}>
                <div style={{color:'gold', fontWeight: '400'}}>Certified by:</div>
                <div className='footer-certificates'>
                    <img className='footer-certificate-google-logo' src={require('../images/google-logo.png')}/>
                    <img className='footer-certificate-hubspot-logo' src={require('../images/hubspot-logo.png')}/>     
                </div>
            </div>
            <hr style={{color: 'white', height: '2px', display:'block'}}/>
        </div>
    )
}

export default Footer
