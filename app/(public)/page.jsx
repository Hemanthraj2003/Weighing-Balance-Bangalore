"use client";

import Link from "next/link";
import "@/styles/Home.css";

const Home = () => {

  /* =====================================================
     PRODUCT CATEGORIES
  ===================================================== */

  const categories = [
    {
      name: "Analytical Balances",
      image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498280/weighing-balance/media/he4qeyqiqrpbu8nzohgh.png",
      link: "/products?category=Analytical Balances",
    },
    {
      name: "Precision Balances",
      image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498281/weighing-balance/media/r6pipsgha1jyaaey5itk.png",
      link: "/products?category=Precision Balances",
    },
    {
      name: "Moisture Analyzers",
      image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498280/weighing-balance/media/dedsz5xjqh65abqxijpz.png",
      link: "/products?category=Moisture Analyzers",
    },
    {
      name: "Platform Scales",
      image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498280/weighing-balance/media/mnefv0zcqu3zzfq2tajv.png",
      link: "/products?category=Platform Scales",
    },
    {
      name: "Table Top Balances",
      image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498281/weighing-balance/media/fgojp71xtmhsnhvpwzf7.png",
      link: "/products?category=Table Top Balances",
    },
    {
      name: "Accessories & Kits",
      image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498279/weighing-balance/media/yz727ibzj3csazsyhpbk.png",
      link: "/products?category=Accessories",
    },
  ];


  /* =====================================================
     FEATURED PRODUCTS
  ===================================================== */

  const featuredProducts = [
    {
      name: "220g / 0.0001g Analytical Balance",
      image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498286/weighing-balance/media/j0avuppbp4dkox06i2ls.png",
      link: "/products",
    },
    {
      name: "320g / 0.0001g Analytical Balance",
      image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498286/weighing-balance/media/bzfmre8rexzqxxj4qsbm.png",
      link: "/products",
    },
    {
      name: "Moisture Analyzer MA-110",
      image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498287/weighing-balance/media/kuxuublsgpgpbty6adun.png",
      link: "/products",
    },
    {
      name: "300kg Platform Scale DS-300",
      image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498287/weighing-balance/media/lo0t4dh2npp4lizuurho.png",
      link: "/products",
    },
    {
      name: "60kg Table Top Balance",
      image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498287/weighing-balance/media/h4vtgdvszsbeqxn0jrjk.png",
      link: "/products",
    },
    {
      name: "Density Kit for Solids & Liquids",
      image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498286/weighing-balance/media/ckfltg3h5k27wrntfcxd.png",
      link: "/products",
    },
  ];


  /* =====================================================
     APPLICATIONS
  ===================================================== */

  const applications = [
    {
      name: "Pharmaceutical Industry",
      image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498283/weighing-balance/media/u01lvwvbtmfjugqzbswa.png",
    },
    {
      name: "Laboratories",
      image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498282/weighing-balance/media/u45242vjoxyipeg6vlkm.png",
    },
    {
      name: "Food Industry",
      image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498282/weighing-balance/media/jaigfqbcv5gc7tre2o2z.png",
    },
    {
      name: "Manufacturing",
      image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498283/weighing-balance/media/x0jllrusgmlsjfl49w9a.png",
    },
    {
      name: "Chemical Industry",
      image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498281/weighing-balance/media/x3tvdjrqw8cyripqhrvz.png",
    },
    {
      name: "Industrial Weighing",
      image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498281/weighing-balance/media/myxdlmjeijxutthqp99t.png",
    },
  ];


  return (
    <main className="home-page">


      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="home-hero">

        <div className="hero-container">

          <div className="hero-content">

            <p className="hero-tagline">
              PRECISION YOU CAN TRUST
            </p>

            <h1>
              Weighing Balance
              <br />
              Solutions for Every Industry
              <br />
              in <span>Banglore.</span>
            </h1>

            <p className="hero-description">
              Weighing Balance Bangalore provides high-quality laboratory
              balances, precision scales, moisture analyzers and weighing
              solutions for laboratories, industries, research and quality
              control applications.
            </p>

            <div className="hero-buttons">

              <Link href="/products"
                className="primary-btn"
              >
                Explore Products <span>→</span>
              </Link>

              <Link href="/contact"
                className="secondary-btn"
              >
                Request a Quote
              </Link>

            </div>

          </div>


          <div className="hero-image-wrapper">

            <img
              src="https://res.cloudinary.com/hehl57yx/image/upload/v1790498288/weighing-balance/media/gzqvrltvlbkby8zozk85.png"
              alt="Precision laboratory balances and weighing instruments from Weighing Balance Bangalore"
              className="hero-product-image"
            />

          </div>

        </div>

      </section>



      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section className="benefits-section">

        <div className="benefits-container">

          <div className="benefit-item">

            <div className="benefit-icon">
              ◎
            </div>

            <div>
              <h3>
                High Accuracy
              </h3>

              <p>
                Reliable Results
              </p>
            </div>

          </div>


          <div className="benefit-item">

            <div className="benefit-icon">
              ▣
            </div>

            <div>
              <h3>
                Wide Product Range
              </h3>

              <p>
                For Every Need
              </p>
            </div>

          </div>


          <div className="benefit-item">

            <div className="benefit-icon">
              ⚙
            </div>

            <div>
              <h3>
                Advanced Technology
              </h3>

              <p>
                For Performance
              </p>
            </div>

          </div>


          <div className="benefit-item">

            <div className="benefit-icon">
              ✓
            </div>

            <div>
              <h3>
                Certified Quality
              </h3>

              <p>
                Built to Last
              </p>
            </div>

          </div>


          <div className="benefit-item">

            <div className="benefit-icon">
              ◉
            </div>

            <div>
              <h3>
                Expert Support
              </h3>

              <p>
                Always With You
              </p>
            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          PRODUCT CATEGORIES
      ===================================================== */}

      <section className="categories-section">

        <div className="section-heading">

          <p>
            OUR RANGE
          </p>

          <h2>
            Our Product Categories
          </h2>

          <span></span>

        </div>


        <div className="categories-grid">

          {categories.map((category) => (

            <Link href={category.link}
              className="category-card"
              key={category.name}
            >

              <div className="category-image-box">

                <img
                  src={category.image}
                  alt={`${category.name} - Weighing Balance Bangalore`}
                />

              </div>


              <div className="category-card-content">

                <h3>
                  {category.name}
                </h3>

                <span>
                  View Products <b>→</b>
                </span>

              </div>

            </Link>

          ))}

        </div>

      </section>



      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}

      <section className="featured-section">

        <div className="section-heading">

          <p>
            PRECISION INSTRUMENTS
          </p>

          <h2>
            Featured Products
          </h2>

          <span></span>

        </div>


        <div className="featured-grid">

          {featuredProducts.map((product) => (

            <Link href={product.link}
              className="featured-card"
              key={product.name}
            >

              <div className="featured-image-box">

                <img
                  src={product.image}
                  alt={`${product.name} - Precision weighing instrument`}
                />

              </div>


              <div className="featured-content">

                <h3>
                  {product.name}
                </h3>

                <span>
                  View Details <b>→</b>
                </span>

              </div>

            </Link>

          ))}

        </div>


        <div className="view-all-container">

          <Link href="/products"
            className="view-all-btn"
          >
            View All Products →
          </Link>

        </div>

      </section>



      {/* =====================================================
          APPLICATIONS
      ===================================================== */}

      <section className="applications-section">

        <div className="applications-intro">

          <p className="applications-small-title">
            WEIGHING SOLUTIONS FOR
          </p>

          <h2>
            Every Industry
          </h2>

          <p>
            Our precision instruments are designed to deliver accurate and
            reliable measurement results across a wide range of industries
            and applications.
          </p>


          <ul>

            <li>
              Pharmaceutical & Research
            </li>

            <li>
              Laboratories & Educational Institutions
            </li>

            <li>
              Food & Beverage Industry
            </li>

            <li>
              Chemical & Process Industry
            </li>

            <li>
              Industrial & Manufacturing Applications
            </li>

          </ul>


          <Link href="/applications"
            className="applications-btn"
          >
            Explore Applications →
          </Link>

        </div>



        <div className="applications-grid">

          {applications.map((application) => (

            <Link href="/applications"
              className="application-card"
              key={application.name}
            >

              <img
                src={application.image}
                alt={`${application.name} weighing solutions`}
              />

              <div className="application-overlay">

                <h3>
                  {application.name}
                </h3>

                <span>
                  Explore Solutions →
                </span>

              </div>

            </Link>

          ))}

        </div>

      </section>



      {/* =====================================================
          SEO CONTENT
      ===================================================== */}

      <section className="home-seo-section">

        <div className="seo-content">

          <div>

            <p className="seo-small-heading">
              WEIGHING BALANCE BANGALORE
            </p>

            <h2>
              Trusted Precision Weighing and Laboratory Balance Solutions
            </h2>

          </div>


          <div className="seo-text">

            <p>
              Weighing Balance Bangalore supplies precision laboratory
              weighing instruments for laboratories, research facilities,
              educational institutions and industrial applications. Our
              product range includes analytical balances, precision balances,
              moisture analyzers, platform scales, table top balances and
              weighing accessories.
            </p>

            <p>
              We focus on measurement accuracy, dependable performance and
              professional customer support to help customers choose the
              right weighing solution for their specific application.
            </p>


            <Link href="/about"
              className="seo-link"
            >
              Learn More About Us →
            </Link>

          </div>

        </div>

      </section>



      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="home-footer">


        {/* ================= FOOTER MAIN ================= */}

        <div className="footer-main">


          {/* ABOUT US */}

          <div className="footer-column footer-about">

            <h3>
              ABOUT US
            </h3>

            <div className="footer-red-line"></div>

            <p>
              Weighing Balance Bangalore provides reliable laboratory
              weighing instruments and precision weighing solutions for
              laboratories, research facilities, industries and quality
              control applications.
            </p>

            <Link href="/about"
              className="footer-read-more"
            >
              Read More →
            </Link>

          </div>



          {/* QUICK LINKS */}

          <div className="footer-column">

            <h3>
              QUICK LINKS
            </h3>

            <div className="footer-red-line"></div>

            <Link href="/">
              Home
            </Link>

            <Link href="/about">
              About Us
            </Link>

            <Link href="/products">
              Products
            </Link>

            <Link href="/applications">
              Applications
            </Link>

            <Link href="/services">
              Services
            </Link>

            <Link href="/blog">
              Blog
            </Link>

            <Link href="/contact">
              Contact Us
            </Link>

          </div>



          {/* PRODUCTS */}

          <div className="footer-column">

            <h3>
              PRODUCTS
            </h3>

            <div className="footer-red-line"></div>

            <Link href="/products?category=Analytical Balances">
              Analytical Balances
            </Link>

            <Link href="/products?category=Precision Balances">
              Precision Balances
            </Link>

            <Link href="/products?category=Moisture Analyzers">
              Moisture Analyzers
            </Link>

            <Link href="/products?category=Platform Scales">
              Platform Scales
            </Link>

            <Link href="/products?category=Table Top Balances">
              Table Top Balances
            </Link>

            <Link href="/products?category=Accessories">
              Accessories & Kits
            </Link>

            <Link href="/products">
              View All Products
            </Link>

          </div>



          {/* CONTACT US */}

          <div className="footer-column footer-contact">

            <h3>
              CONTACT US
            </h3>

            <div className="footer-red-line"></div>


            <div className="footer-contact-item">

              <span>
                ⌖
              </span>

              <p>
                No.5/4, 3rd Floor,
                <br />
                4th Cross, Beside Vinayaka School,
                <br />
                Cubbonpet, Bengaluru,
                <br />
                Karnataka - 560002
              </p>

            </div>


            <div className="footer-contact-item">

              <span>
                ☎
              </span>

              <p>
                +91 9590451006
              </p>

            </div>


            <div className="footer-contact-item">

              <span>
                ✉
              </span>

              <p>
                Contact us through our
                <br />
                enquiry form.
              </p>

            </div>


            <Link href="/contact"
              className="footer-contact-button"
            >
              Contact Us →
            </Link>

          </div>

        </div>



        {/* ================= FOOTER BOTTOM ================= */}

        <div className="footer-bottom">

          <p>
            © 2026 Weighing Balance Bangalore. All Rights Reserved.
          </p>


          <div className="footer-bottom-links">

            <Link href="/privacy-policy">
              Privacy Policy
            </Link>

            <span>
              |
            </span>

            <Link href="/terms">
              Terms & Conditions
            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
};

export default Home;