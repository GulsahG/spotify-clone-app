import { validateRoute } from "../../lib/auth";

export default validateRoute((_req, res, user) => {
  res.json(user);
});
