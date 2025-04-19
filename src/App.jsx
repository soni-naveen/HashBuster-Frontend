import React, { useState } from "react";
import axios from "axios";
import { AnimatedTitle } from "./components/animated-title";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Shield, Key, RefreshCw, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function HashBuster() {
  const [hash, setHash] = useState("");
  const [algorithm, setAlgorithm] = useState("md5");
  const [method, setMethod] = useState("brute-force");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // API URLs
  const API_URL = "http://localhost:4000/crack";

  // Handle Crack Password
  const handleCrack = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await axios.post(API_URL, { hash, algorithm, method });
      setResult(response.data);
    } catch (error) {
      setError("Failed to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Reset
  const handleReset = () => {
    setHash("");
    setAlgorithm("md5");
    setMethod("brute-force");
    setResult(null);
    setError("");
  };

  return (
    <motion.div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-5">
      <div className="w-full max-w-4xl gap-20">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8 text-center"
        >
          <AnimatedTitle />
          <p className="text-gray-300 mt-2">
            Advanced Password Hash Cracking Tool
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Card className="border-0 w-xl mx-auto bg-black/40 backdrop-blur-md shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-white">
                <Shield className="mr-2 h-5 w-5 text-purple-400" />
                Password Cracker
              </CardTitle>
              <CardDescription className="text-gray-400 ml-1 mb-5">
                Enter a hash to attempt to crack it
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCrack} className="space-y-6">
                <div>
                  <label
                    htmlFor="hash"
                    className="text-base font-medium text-gray-300"
                  >
                    Hash Value
                  </label>
                  <Input
                    id="hash"
                    type="text"
                    placeholder="Enter hash value"
                    value={hash}
                    onChange={(e) => setHash(e.target.value)}
                    required
                    className="bg-gray-800/50 mt-1 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="algorithm"
                      className="text-sm font-medium text-gray-300"
                    >
                      Algorithm
                    </label>
                    <Select value={algorithm} onValueChange={setAlgorithm}>
                      <SelectTrigger className="bg-gray-800/50 mt-1 border-gray-700 text-white">
                        <SelectValue placeholder="Select algorithm" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="md5">MD5</SelectItem>
                        <SelectItem value="sha1">SHA-1</SelectItem>
                        <SelectItem value="sha256">SHA-256</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="method"
                      className="text-sm font-medium text-gray-300"
                    >
                      Method
                    </label>
                    <Select value={method} onValueChange={setMethod}>
                      <SelectTrigger className="bg-gray-800/50 mt-1 border-gray-700 text-white">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="brute-force">Brute Force</SelectItem>
                        <SelectItem value="dictionary">
                          Dictionary Attack
                        </SelectItem>
                        <SelectItem value="rainbow-table">
                          Rainbow Table
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 text-white bg-purple-600 hover:bg-purple-700 uppercase"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Crack 
                  </Button>
                  <Button
                    type="button"
                    onClick={handleReset}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </form>

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 flex flex-col items-center justify-center text-center"
                >
                  <div className="relative h-12 w-12">
                    <div className="absolute inset-0 rounded-full border-2 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                    <div className="absolute inset-1 rounded-full border-2 border-t-transparent border-r-purple-400 border-b-transparent border-l-transparent animate-spin animation-delay-200"></div>
                    <div className="absolute inset-2 rounded-full border-2 border-t-transparent border-r-transparent border-b-purple-300 border-l-transparent animate-spin animation-delay-400"></div>
                  </div>
                  <p className="mt-4 text-gray-300">
                    Cracking in progress... Please wait ⏳
                  </p>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-3 bg-red-900/40 border border-red-800 rounded-md text-red-300 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {result && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-md border bg-gray-800/50 border-gray-700"
                >
                  <h3 className="text-white font-medium mb-2 flex items-center">
                    <Key className="mr-2 h-4 w-4 text-purple-400" />
                    Result
                  </h3>
                  {result.success ? (
                    <div className="p-3 bg-green-900/30 border border-green-800 rounded-md text-green-300">
                      <span className="font-medium">Cracked Password:</span>{" "}
                      {result.password}
                    </div>
                  ) : (
                    <div className="p-3 bg-orange-900/30 border border-orange-800 rounded-md text-orange-300">
                      Password not found
                    </div>
                  )}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
