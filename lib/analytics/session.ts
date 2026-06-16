export function getSessionId() {
  let sid = localStorage.getItem("sid");

  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem("sid", sid);
  }

  return sid;
}
