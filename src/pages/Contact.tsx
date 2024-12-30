import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen pt-20 pb-12 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-stone-800">Get in Touch</h1>
          {/* <p className="mt-4 text-xl text-stone-600">
            Let's discuss how we can work together
          </p> */}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-lg shadow-xl"
          >
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-stone-800 hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
              >
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-stone-800" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-stone-600">panav_2101ee48@iitp.ac.in</p>
                  <p className="text-stone-600">praajarpit@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-stone-800" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-stone-600">+1 (91) 9606158818</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-stone-800" />
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-stone-600">Bangalore, KA, India</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;