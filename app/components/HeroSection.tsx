import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content */}
          <div className="lg:w-1/2 space-y-6 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="block text-blue-600 dark:text-blue-400">
                Hi, I'm Mike Castor
              </span>
              <span className="mt-2 block">Full-Stack Software Engineer</span>
            </h1>

            <p className="text-xl text-gray-950 dark:text-gray-400">
              I build elegant, performant web experiences using modern
              JavaScript frameworks and clean, semantic code. Based in Seattle,
              WA.
            </p>

            {/* Skills chips */}
            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "React",
                "React Router",
                "Next.js",
                "JavaScript",
                "TypeScript",
                "Node.js",
                "HTML",
                "CSS",
                "MongoDB",
                "PostgreSQL",
                "RestAPIs",
                "CSS",
                "AWS",
                "CI/CD",
              ].map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                to="/projects"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center transition shadow-md hover:shadow-lg"
              >
                View My Projects
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right content (illustration) */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 500 500"
                className="text-blue-600/70 dark:text-blue-400/70"
              >
                <circle
                  cx="250"
                  cy="250"
                  r="200"
                  fill="currentColor"
                  opacity="0.1"
                />
                <g fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M100,250 C100,138.954305 188.954305,50 300,50" />
                  <path d="M400,250 C400,361.045695 311.045695,450 200,450" />
                </g>
                <g fill="currentColor">
                  <rect
                    x="210"
                    y="150"
                    width="80"
                    height="30"
                    rx="5"
                    opacity="0.5"
                  />
                  <rect
                    x="180"
                    y="200"
                    width="140"
                    height="30"
                    rx="5"
                    opacity="0.7"
                  />
                  <rect
                    x="150"
                    y="250"
                    width="200"
                    height="30"
                    rx="5"
                    opacity="0.9"
                  />
                  <rect
                    x="180"
                    y="300"
                    width="140"
                    height="30"
                    rx="5"
                    opacity="0.7"
                  />
                  <rect
                    x="210"
                    y="350"
                    width="80"
                    height="30"
                    rx="5"
                    opacity="0.5"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
