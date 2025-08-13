# iFDO Browser

<div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
  <img src="docs/_static/logo_paidiver.png" alt="iFDO Browser Logo" style="width: 120px; min-width: 120px;"/>
  <div>
    <strong>iFDO Browser</strong> is a <a href="https://www.ifdo-schema.org/">FAIR Digital Objects for Images (iFDO)</a> browser.
    It is a web application that allows users to explore and visualize metadata catalogs, datasets, and images in a user-friendly way.
    <br><br>
    <strong>Live demo:</strong> <a href="https://paidiver.github.io/ifdo-browser">https://paidiver.github.io/ifdo-browser</a>
  </div>
</div>

</br>

> **Note:** This package is still in active development, and frequent updates and changes are expected. The API and features may evolve as we continue improving it.

---

## Overview

The iFDO Browser allows you to work with iFDO metadata files or an iFDO API, presenting the metadata in a way that is easy to understand and navigate.

⚠ **Currently, iFDO Browser supports only data served from an iFDO API.**

Version: **0.1.0** (compatible with all iFDO versions ≥ 2.0.0)

---

## Prerequisites

To run this project locally, you must have an instance of the **iFDO API** running — either locally or remotely.
The iFDO Browser communicates with the iFDO API to retrieve metadata and data for FAIR Digital Objects.

For instructions on running the iFDO API using Docker, see:
[https://github.com/paidiver/ifdo-api](https://github.com/paidiver/ifdo-api)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/paidiver/ifdo-browser.git
cd ifdo-browser
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the iFDO API URL

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_API_PATH=http://localhost:8080/api/v1
```

Replace the URL with the path to your iFDO API instance.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Add your own datasets

- Select a catalog from the bottom bar.
- Add a new dataset (iFDO metadata file) or a remote iFDO API URL.
- Once added, you can explore it directly in the browser.

---

## Related Tools

- [iFDO API](https://github.com/paidiver/ifdo-api)
- [STAC Browser](https://github.com/radiantearth/stac-browser)

---

## Acknowledgements

This project was supported by the UK Natural Environment Research Council (NERC) through the
_Tools for automating image analysis for biodiversity monitoring (AIAB)_ Funding Opportunity, reference code **UKRI052**.
