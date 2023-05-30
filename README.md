<p align="center">
  <a href="https://github.com/ux-practice/iREST">
    <h1 align="center">iREST</h1>
  </a>
</p>

<h3 align="center">REST API SIMULATOR</h3>
<p align="center"> iREST is a zero-configuration application that allows you to easily create/manage APIs, generate random data on demand and perform operations on that data using REST interface!.</p>
<br />

<p align="center">
  <a href="https://www.npmjs.com/package/irest-app">
    <img src="https://img.shields.io/npm/v/irest-app/latest.svg" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.com/package/irest-app" rel="nofollow"><img src="https://img.shields.io/npm/dm/irest-app.svg" alt="Downloads" style="max-width: 100%;"></a>
</p>

<br>

<p align="center">
  <a href="https://strapi.io">
    <img src="https://github.com/ux-practice/iREST/blob/media/iRest-Rest-API-Simulator.png" alt="iREST - REST API SIMULATOR" />
  </a>
</p>

<br>

**iREST** will be a game changer for those who want to quickly develop API prototypes and want to test all the scenarios during integration in minimum time and that is too without even knowing or writing a single line of code. It would save lot of time of developers/consumers who spent or wait longer time for APIs to be ready on server and can also reduce QA iterations by testing all things in advance.  

## Getting Started

### ⏳ Installation

Install iREST with this **Quickstart** command to create a iREST project on your machine:

- Use **NPX** to install the iREST project (recommended). (Install NPX with this command - npm install -g npx).

```bash
npx irest <my-app>
```

**or**

- Use npm to install the iREST project.

```bash
npm install -g irest
```
```bash
irest <my-app>
```
This command generates a brand new project with <my-app> name on your machine. This command installs **iREST** using a **SQLite** database which is used for prototyping in development.

  <br>
  
**Run iREST on your machine**
  - Go to your newly created app and run the following command:

```bash
npm start
```  
This command will run the iREST instance on your machine and open a new browser tab in which iREST would be running.
  
  
Enjoy and start playing with **iREST** 🎉
<br>
### 🖐 Requirements

**Supported operating systems**:

- Ubuntu LTS/Debian 9.x
- CentOS/RHEL 8
- Windows 10
- Docker

(Please note that **iREST** may work on other operating systems, but these are not tested nor officially supported at this time.)

**Node:**

**iREST** only supports maintenance and LTS versions of Node.js. Please refer to the <a href="https://nodejs.org/en/about/releases/">Node.js release schedule</a> for more information. NPM versions installed by default with Node.js are supported.

| iREST Version  | Recommended | Minimum |
| -------------- | ----------- | ------- |
| 2.0.0 and up   | 16.x        | 14.x    |

**Database:**

| Database   | Recommended | Minimum |
| ---------- | ----------- | ------- |
| SQLite     | 3           | 3       |

**We recommend always using the latest version of **iREST** stable to start your new projects**.

## Features

- **Faster development time**. by mocking APIs.
- **Customizable**. responses and status codes.
- **Generating**. random data on the fly via faker API.
- **Seamless**. mocking of RESTful API.
- **Rapidly prototype**. APIs before building your final solution.
- **API Secrets**. to provide API authentication.
- **Support for**. GET, POST, PUT, PATCH and DELETE methods.
- **Single API creation**. with multiple method supports.
- **Preview**. of API response before creating a Mock API.
- **Tryout**. with Open API spec viewer.
- **Dynamic Response for Data Retrieval API responses**. such as delay, duplication of specific record, dynamic size, etc.
- **Download**. mocked requests as a Postman Collection with a single click.
- **Blazing Fast:** Built on top of Node.js, iREST delivers amazing performance.
- **Front-end Agnostic:** Use any front-end framework (React, Vue, Angular, etc.), mobile apps or even IoT.
- **Powerful CLI:** Scaffold projects and APIs on the fly.
- **SQL databases:** Works with SQLite.


## Roadmap

Check out our roadmap below to get informed about the upcoming features. You may also give us insights and suggessions for any new feature.

- UX/Usability review
- User help
- RBAC / Multitenancy support
- API response Monitoring/Logging
- Support for Network Level Response Interceptor / HTTP proxy server
- Support streaming of data
- Support for Pagination/Sorting/Searching in API response
- Reduce bundle size light weight application
- Move to better-sqlite3 for faster performance
- Containerization of Application using Docker

## Documentation

See our dedicated repository - https://github.com/ux-practice/iREST/tree/iREST_2.0_RELEASE_PUBLISH/docs for the iREST documentation, or view our documentation live:

- [Developer docs](https://github.com/ux-practice/iREST/blob/iREST_2.0_RELEASE_PUBLISH/docs/api.md)
- [User guide](https://github.com/ux-practice/iREST/blob/iREST_2.0_RELEASE_PUBLISH/docs/user-guide.md)

## License

See the [LICENSE](./LICENSE) file for licensing information.
