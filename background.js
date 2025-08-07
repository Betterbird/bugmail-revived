// Copyright (c) 2025, The Betterbird Project, Jörg Knobloch. All rights reserved.

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function (match) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[match];
  });
}

browser.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  let message = await browser.messageDisplay.getDisplayedMessage();
  let content = await browser.messages.getFull(message.id, { decodeContent: false, decodeHeaders: false, decrypt: false });
  let bugzillaID = "";
  for (const [key, value] of Object.entries(content.rawHeaders)) {
    if (key == "x-bugzilla-id") {
      bugzillaID = value[0];
      break;
    }
  }
  if (!bugzillaID) {
    return "This ain't no bugmail!";
  }

  const response = await fetch(`https://bugzilla.mozilla.org/rest/bug/${bugzillaID}`);
  const data = await response.json();
  const bug = data.bugs[0];

  let result = `<b>Bug ${bugzillaID}</b> (Reporter: ${bug.creator} / Date: ${bug.creation_time.substring(0, 10)})<br>
${escapeHTML(bug.summary)}<br>
${bug.product} / ${bug.component} / ${bug.platform} / ${bug.op_sys}<br>
Version: ${bug.version} / Milestone: ${bug.target_milestone}<br>
<b>Status: ${bug.status}${bug.resolution ? " " : ""}${bug.resolution}</b> / Assignee: ${bug.assigned_to}`;
  if (bug.keywords.length) {
    result += `<br>Keywords: ${bug.keywords}`;
  }
  return result;
});