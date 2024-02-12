export const FetchUserQuery = `
  SELECT
        u.username,
        u.password
    FROM
        public.users u
    WHERE
        u.username = $1 AND u.is_deleted = FALSE
`;
