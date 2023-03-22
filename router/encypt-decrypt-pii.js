const express = require("express");
const Router = new express.Router();
const { supabase } = require("../utils/supabase");
const {
  encryptWithPublicKey,
  decryptWithPrivateKey,
} = require("../utils/encypt");

Router.post("/encrypt-pii-number", async (req, res) => {
  const { wallet, number } = req.body;
  const encrypted_number = encryptWithPublicKey(
    "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwWpFql9xN/3U0klOegqS\nZinvg4ysUG6bll/uLWPit7qa2ThH/lLIHNJYpa3Crf3fKZ1+Rcx5Bdgqugwzq9xF\nDs28Ju3jq7AF15rti/fbcwYgQc9eQm9dUDYgDYGbM/x5hdO/C/0l8h/w92Jwadhr\nhtyB6rKRVt1W2w0x5/hYFYpWpL6sRuBClaREBP7sYzbgf7GzZRpJmbDWN3C6tbJ0\nbTeU84XyqX6BAxewZKJzikoSeqI/vqGF7W3tPKssdTpoQJgsziRruO+tZ4V4Cg2h\nEAbQ0NUIMfTG692TrDj9qdBB1k45GbjurBXvKd2cZ5RnnbRor6/bapalCNRz0WaN\nKQIDAQAB\n-----END PUBLIC KEY-----\n",
    number
  );
  await supabase
    .from("users")
    .update({ encypted_telegram_number: encrypted_number })
    .match({ wallet_identifier: wallet });
  console.log(encrypted_number);
  res.send(true);
});

Router.post("/decrypt-pii-number", async (req, res) => {
  const { wallet } = req.body;
  const { data } = await supabase
    .from("users")
    .select("*")
    .match({ wallet_identifier: wallet });
  const number = decryptWithPrivateKey(
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDBakWqX3E3/dTS\nSU56CpJmKe+DjKxQbpuWX+4tY+K3uprZOEf+Usgc0lilrcKt/d8pnX5FzHkF2Cq6\nDDOr3EUOzbwm7eOrsAXXmu2L99tzBiBBz15Cb11QNiANgZsz/HmF078L/SXyH/D3\nYnBp2GuG3IHqspFW3VbbDTHn+FgVilakvqxG4EKVpEQE/uxjNuB/sbNlGkmZsNY3\ncLq1snRtN5TzhfKpfoEDF7BkonOKShJ6oj++oYXtbe08qyx1OmhAmCzOJGu4761n\nhXgKDaEQBtDQ1Qgx9Mbr3ZOsOP2p0EHWTjkZuO6sFe8p3ZxnlGedtGivr9tqlqUI\n1HPRZo0pAgMBAAECggEAGmwjMkAxnl2NymB7WQ7CqzRFZSo9jAtgM+3NAuRnX4Qd\njVkz9Jlofw95TsDrHIvXBb9fNbfWPKcoRxxNnsfLo1cVwhezh4vXcHnYw8tLbm5C\nz9q9XMQL8l5CiLXQ9wwhqdegfMnLekVEzPbktoD7R4QuN1rHoh9As1IdJDx4BBES\nL62RofvJtU2TqMO4LIbVEXKS4JFpdjkEoM4KU04wZBL5kX7oxNxkhzefH5ZwZ2Rx\ne0tGTSHGS9qgNiProU/SLKoCuQ/HKeOvsqKAV3pLBYzoQLorV+lwpOv8OvBe2YOk\npaRStAUmKWWBQql6wNLRLyEI6Bd3e/ebDTWF6+zWpQKBgQDjKBXWQD12pJFridhS\nkMQ1VynoZXwunKwuaGBwElf8hNIasLP0oHXRx97El7EIw12IkvumbsTOBowmGohj\n6jT8JbJuxXppsKZld8aZWNzwvSVMIrN7JBL/7eAn38SCTKri5JE6siUtX6JFomhR\nWRyug+mirPKhKg8SPtQSpAPyowKBgQDZ+WR88Mc74jmtUsP7k73aanMGTETrrRW6\n8XFdGYuZ5fSZgCPn6QhqgMllShxHhpelu/AYr4GT6bcHP0w46PBVs8hzhDQUr10q\nXIK1ky1bjDalxg1N+VuZdeTpcRv9f1R9IZOUgxauRKe9xMybT4CO7S322GGRbAv2\nRacxIH8JwwKBgQCumpZGbHSSKKcauQcNV/dpZMlyt+c/UPBMb7CJFKCLGnEBUQfS\nJjDKAk7qYAsVSE4x94D1ijk+f+vkMgraeiEmG7fOy35vlPgiEHIYVyTk6w6rOhUp\nty3fiTH+lFLRMSs9YiF7s4k+Gj96NP7oYI3aWs0QXM3XMaQKCz8p4Oaj7wKBgEiP\nNFxC6o+MpxaDTqoYbEKg3Nlj2i152Jn6dXpAXrBEVEAk3877S8noRSJqoS9OJn0N\nKseM5N2QF1VaRM1M/XQJ/Ng3Uf7wwVqwoPJApACtlCNq4lLqhwt2q1TqSh8Am+dr\nnez6Fjq8r/oD4PhyZqEtYveg4BnAldrNJPK9loxxAoGAfpdWjlo52D66ANpCEsvN\n+hc3RR58oxL9vs+kuI0+XCqBvotvjeX3Q+H0dN3aRjG7ATUQeAvGjjIA5mH//cd2\njrOW190sTZepBCPgpG1HDPXA39J6etwr22Ox7CjoFYpqzTfHjKkrjjZpvm39/TTq\nHAeOuXE7HaFgDbelwy1+fTw=\n-----END PRIVATE KEY-----\n",
    data[0].encypted_telegram_number
  );
  setTimeout(()=>{
    res.send(number);
  })
});

module.exports = Router;
