// Copyright (c) 2025, The Betterbird Project, Jörg Knobloch. All rights reserved.

document.addEventListener("DOMContentLoaded", () => {
  browser.runtime.sendMessage({}).then((response) => {
    document.getElementById("content").innerHTML = response;
  });
});
