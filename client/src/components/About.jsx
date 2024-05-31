import React from "react";

const About = () => {
  return (
    <div className="mt-28 px-4 lg:px-24 w-full">
      <h1 className="text-4xl font-bold mb-6 text-center">About YardSaleHub</h1>
      <p className="text-lg mb-6">
        Welcome to YardSaleHub, your one-stop destination for posting and
        finding yard sales in your community. Whether you're looking to
        declutter your home, find a great bargain, or connect with your
        neighbors, YardSaleHub makes it easy and fun!
      </p>

      <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
      <p className="text-lg mb-6">
        At YardSaleHub, our mission is to create a seamless and enjoyable
        experience for both sellers and buyers. We believe that yard sales are
        more than just a way to exchange goods—they're a way to build community,
        recycle treasures, and make new connections. Our platform is designed to
        make hosting and finding yard sales as simple and efficient as possible.
      </p>

      <h2 className="text-3xl font-semibold mb-4">How It Works</h2>

      <h3 className="text-2xl font-semibold mb-2">For Sellers:</h3>
      <ol className="list-decimal list-inside mb-6 space-y-2">
        <li>
          <strong>Create an Account:</strong> Sign up for a free account to get
          started.
        </li>
        <li>
          <strong>Post Your Sale:</strong> Easily create a listing for your yard
          sale with details like date, time, location, and a description of the
          items you're selling. You can also upload photos to showcase your
          products.
        </li>
        <li>
          <strong>Manage Your Listings:</strong> Update your sale information,
          respond to buyer inquiries, and track the success of your sale all
          from your dashboard.
        </li>
      </ol>

      <h3 className="text-2xl font-semibold mb-2">For Buyers:</h3>
      <ol className="list-decimal list-inside mb-6 space-y-2">
        <li>
          <strong>Browse Sales:</strong> Use our search and filter options to
          find yard sales near you. View detailed listings with photos and
          descriptions to plan your visit.
        </li>
        <li>
          <strong>Contact Sellers:</strong> Reach out to sellers directly
          through our messaging system to ask questions or negotiate prices.
        </li>
        <li>
          <strong>Find Great Deals:</strong> Discover unique items and great
          bargains at yard sales in your community.
        </li>
      </ol>

      <h2 className="text-3xl font-semibold mb-4">Why Choose YardSaleHub?</h2>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>
          <strong>User-Friendly Interface:</strong> Our platform is designed to
          be intuitive and easy to use, even for those who aren't tech-savvy.
        </li>
        <li>
          <strong>Local Focus:</strong> We prioritize local listings to help you
          connect with sellers and buyers in your area.
        </li>
        <li>
          <strong>Community Building:</strong> YardSaleHub is more than just a
          marketplace; it's a community of like-minded individuals who enjoy the
          fun and social aspects of yard sales.
        </li>
        <li>
          <strong>Secure Transactions:</strong> Your privacy and security are
          important to us. We offer secure messaging and account management
          features to protect your information.
        </li>
      </ul>

      <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
      <p className="text-lg mb-6">
        YardSaleHub is constantly growing and evolving, thanks to our vibrant
        community of users. Whether you're a seasoned yard sale enthusiast or
        new to the scene, we invite you to join us and see what treasures you
        can find or sell. Sign up today and become a part of the YardSaleHub
        family!
      </p>
    </div>
  );
};

export default About;
