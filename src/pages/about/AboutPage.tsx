import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto py-12 px-6 md:px-8"> {/* Updated padding and vertical spacing */}
      <header className="text-center mb-16"> {/* Increased bottom margin */}
        <h1 className="text-5xl font-bold text-primary-600 mb-4">Welcome to Gasolinapp!</h1> {/* Changed to primary color */}
        <p className="text-xl text-font">Your smart solution for finding the best fuel prices and planning your trips.</p> {/* Changed to font color */}
      </header>

      <section className="mb-16"> {/* Increased bottom margin */}
        <h2 className="text-3xl font-semibold text-primary-500 mb-6 text-center">How It Works</h2> {/* Changed to primary color */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Gasolinapp Logo" className="w-32 h-32 mx-auto mb-4"/>
            <p className="text-lg text-font leading-relaxed mb-4"> {/* Changed to font color */}
              Gasolinapp helps you save money by providing up-to-date information on gas/diesel prices from various stations. 
              Our application allows you to:
            </p>
            <ul className="list-disc list-inside text-lg text-font leading-relaxed space-y-2"> {/* Changed to font color */}
              <li>Select your province to see local fuel stations.</li>
              <li>Choose your preferred type of fuel (e.g., Gasoline 95, Diesel A).</li>
              <li>Enter the distance you plan to travel.</li>
              <li>Specify your vehicle's average fuel consumption.</li>
            </ul>
          </div>
          <div className="text-center">
            {/* You can add an illustrative image or icon here later if desired */}
            <div className="p-6 bg-primary-10 rounded-lg shadow-lg"> {/* Changed background to primary-10 */}
              <h3 className="text-2xl font-semibold text-primary-700 mb-3">Get Instant Calculations</h3> {/* Changed text to primary-700 */}
              <p className="text-lg text-font leading-relaxed"> {/* Changed text to font */}
                Based on your inputs, Gasolinapp will show you the estimated cost for your trip, highlighting the best options available. 
                It considers the latest prices to ensure you make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16 text-center"> {/* Increased bottom margin */}
        <h2 className="text-3xl font-semibold text-primary-500 mb-6">Our Mission</h2> {/* Changed to primary color */}
        <p className="text-lg text-font leading-relaxed max-w-3xl mx-auto"> {/* Changed to font color */}
          Our mission is to make fuel price information transparent and easily accessible, helping drivers optimize their fuel expenses efficiently. 
          We continuously update our data to provide you with the most accurate information.
        </p>
      </section>

      <footer className="text-center pt-8 border-t border-primary-200"> {/* Changed border color */}
        <p className="text-gray-500">Thank you for using Gasolinapp!</p> {/* Changed text color */}
      </footer>
    </div>
  );
};

export default AboutPage;
