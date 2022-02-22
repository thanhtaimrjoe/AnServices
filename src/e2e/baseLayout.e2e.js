const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;

beforeEach(async () => {
  await page.goto(`${BASE_URL}`);
  await page.evaluate(() => {
    localStorage.setItem('antd-pro-authority', '["admin"]');
  });
});
