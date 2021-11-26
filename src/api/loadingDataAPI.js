export default async function requestInfoCard(getUid, dir) {
  const requestInfoCard = await fetch(`https://vue-http-b91f8-default-rtdb.europe-west1.firebasedatabase.app/users/${getUid}/${dir}.json`)
  return await requestInfoCard.json()
}