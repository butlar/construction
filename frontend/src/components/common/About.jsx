import React from 'react'
import AboutImage from '../../assets/images/about-us.jpg';



const About = () => {
  return (
   
    <section className='section-2 py-5'>
    <div className='container'>
        <div className="row">
            <div className='col-md-6'>
                <img src={AboutImage} className ="w-100" alt=""   />
            </div>
            <div className='col-md-6'>
                <span>About Us</span>
                <h2>Crafting structure that last a lifetime</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, harum reiciendis? Veritatis sapiente accusantium at assumenda necessitatibus rem nostrum hic dolor, quas consequatur voluptatibus fugiat, architecto tempore recusandae. Autem, ipsum.  </p>
                <p> Nostrum voluptatem voluptatibus culpa cum, cupiditate commodi fugiat architecto. Quod incidunt veniam consequatur nihil beatae totam aliquid recusandae aut omnis! Illo, voluptatibus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod impedit fuga asperiores ipsam. Illo iste totam </p>
            </div>
        </div>

    </div>
</section>
  )
}

export default About
