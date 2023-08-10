import React from 'react';
// import homeBanner from '@Assets/images/home-banner.jpg';
// import homeBanner from '@Assets/images/homeBanner3.jpg';
import homeBanner from '@Assets/images/banner_new.jpg';
import brochurePDF from '@Assets/documents/usafiri-brochure.pdf';

const Banner = () => (
  <section className="home-banner " id="landing-header">
    <div className="container-fluid">
      <div
        className="home-banner_wrap is-flex is-center is-align-center"
        style={{ paddingTop: '103.188px', minHeight: '585px', paddingBottom: '130px' }}
      >
        <div className="container">
          <div className="row is-center" style={{ marginTop: '3rem' }}>
            <div className="grid-lg-6 grid-sm-12 is-column is-flex is-center is-align-center">
              <div className="home-banner_content pd-15 ">
                <div className="">
                  {/* <h1 className="mb-30">A Participatory Mapping Toolkit to aid Evidence-based decision-making</h1> */}
                  {/* <h4>Piloting the tool for Transport Mobility Assessment in low-income countries.</h4> */}
                  {/* <h4>
                    Creating an open-source, participatory GIS mapping toolkit for last mile communities to engage in
                    the identification of transportation needs and barriers in their regions.
                  </h4> */}
                  <h3 className="intro-text">
                    USAFIRI is a web-based participatory mapping tool developed and coded by a multidisciplinary team
                    consisting of academic institutions, technology service providers, and transportation practitioners.
                  </h3>
                </div>
                <div className="mt-30 pt-15 is-flex">
                  <a className="is-btn is-btn_primary scroll-down" href={brochurePDF} target="_blank" rel="noreferrer">
                    <span>Download Brochure</span>
                  </a>
                </div>
              </div>
              {/* <a href={() => {}} className="is-circle is-circle_sm is-circle_hover scroll-down mt-30"> */}
              {/* <i className="material-icons-outlined">expand_more</i> */}
              {/* </a> */}
            </div>
            <div className="grid-lg-6 grid-sm-12 intro-image">
              <figure className="home-banner_figure">
                <img src={homeBanner} alt="" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Banner;
