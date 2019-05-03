var url = `${process.env.VUE_APP_SERVER}/api/v1/tfstate`;

async function fetchResources() {
  try {
    const resourceData = await fetch(url, {
      method: "GET"
    });
    return resourceData;
  } catch (err) {
    throw err;
  }
}

export { fetchResources };
