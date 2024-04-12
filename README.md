![calq io styled](https://github.com/G0dKing/calc/assets/68952952/139eef1e-b6e2-4e5b-9984-71e13219bfac)

# <i>"Not Just Another Bitch-Ass Calculator"</i>

### VITE | REACT.JS | NODE.JS | EXPRESS.JS | PYTHON 3 | FLASK | GUNICORN | NGINX

# **Project Overview**

**Description:** A full-stack calculator web application using Flask for backend API logic, React with Vite for the frontend, and Node.js+Express for middleware handling, and NGINX for serving and proxying requests in production.
## **Application Infrastructure**
### Backend:

- **API (Python+Flask):** Processes mathematical expressions sent from the frontend as an API endpoint and returns the results. Deployed using Gunicorn.

- **Reverse-Proxy (Nginx):** Serves the React application's static files directly and proxies requests to the Flask backend in production.

- **Server (Node.js+Express)**: Handles middleware such as CORs and implements a rate-limiter. Additionally, serves the frontend static build files and proxies API requests to the Flask backend during development.
### Frontend:

- **Client (Vite+React):** A dynamic , responsive graphical user interface that loads in the browser. Interacts with the Flask backend to fetch calculation results, utilizing state management and reusable components for user inputs such as numerical buttons. Visually, the interface emulates the look of a traditional modern calculator, with some custom-styling for flair.
	**Assets**:
		- logo.png
		-favicon.svg
## **Purpose** 

The project aims to demonstrate the integration of multiple technologies to create a robust full-stack web application, showcasing skills in backend and frontend development, server management, and deployment strategies.
