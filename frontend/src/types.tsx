interface FetchReturn {
  ok: boolean;
  // since its not production yet,
  data: any;
  // i want to point a middlefinger at typescript but it will probably ask me what type my middlefinger is
  // data: {
  //   status?: string;
  //   msg?: string;
  //   accessToken?: string;
  // };
}
