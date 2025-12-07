import { Box, Container, Link, Typography } from "@mui/material";
import React from "react";

export const HeroSection = () => {
  // Gallery images data
  const galleryImages = [
    {
      id: 1,
      src: "https://s3-alpha-sig.figma.com/img/dd11/270c/618047585818a6724c61be49890f1b88?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ITHHyYiXNYESE2BM9gqaaznFfDtJau0-apdrwwtOURSHYdrGW4rkciEW0sZDU6L953APoZ79OSzJFXlgrr6Lp~FAzVouaoivIz3ZGRSOuaYaLBllngHAoWB3F4qhzd43Hapq7ezjqMjs5hp0TP~886~XZxM7-bNsKdaxAfTHm0grm0w3wqHheN6e4~p1lcuTMYwE4DFQE0sQdz5hGUWheFBdnhEWKF0Yg27VpGHYbKH1Fz6iByg5wN2nWlsCrnoZ19NTy3tvhOkLIY4pGEklgFaeUdBQxFAiK4jDVoDaHcbwqUmFfjSbMVBpfjWmQMKAKI9-f8-gkVg0yLRhTU-NAA__",
      alt: "Mountain landscape",
      gridArea: { xs: "auto", md: "1 / 1 / 3 / 3" },
    },
    {
      id: 2,
      src: "https://s3-alpha-sig.figma.com/img/d39c/ca95/9915328f80ddbcfe3528ced8957eaea2?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Zttag0zuuBQTx9fH0~0jlNT5RNRF1Eu5lTSAIHksjzcdXJVzYNYMh~jVmU5npqlnCygdbYhX1dhswy-QfTB3WsU5XXqQZgQ7OAvwhOfXv~pSQNC-p33e3BRQJWGqeq8u7M0I47a5UNrbafjxH2ReZAH3IN-UowgFpbUaJaizr7ZHCYpIk5M7IaJyqTlbO2Xeh4axZSJfAXGl~l2AJCmlkstftpBw66brUY2A7o0glBhE5DhiAOa3PB7SIx9z~slcErLvTU9MCiZUzWORqAiHhFvLjKpR8pvKtqDZVtzBrhChA5rtaMJZ7L9S9GmlcX7LHtH0I63ivdwJK7VGU41qfA__",
      alt: "Waterfall scene",
      gridArea: { xs: "auto", md: "1 / 3 / 5 / 3" },
    },
    {
      id: 3,
      src: "https://s3-alpha-sig.figma.com/img/aba0/264c/03ae568787532436b93eb604d8968d03?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cIXD3VkTXUD1YMM1tq9CfxKkeMMh48OzW6~VLlt~c7bnta99mfXB6BY0pkJBe1m020jRqEfPF8KSq09drp2Gq0c5nyaNGokRvh19mg-s0MvUBDedYhIOXnqlFUPOl~SUFLFCuNdx2wsLyxdlsXUTrk6yP3UijKywFRCIvMxB9Ks3-aDWAyhIkbX046Jj8VZDUZIO3e~bUv3b5rYyYPhtGwZ13BMAZ9fMPA3oPuog0DTcAn6kSoHFEGpIzWeDaREIyhAaZQtY4V6d8rOljyPak7XlXLh6Xi-24MRNf3aZcCbTEc3EewexmV6dG3JPvDm4kYVdNjJKo9XZyDTFlKbjLQ__",
      alt: "Nature view",
      gridArea: { xs: "auto", md: "1 / 4 / 3 / 5" },
    },
    {
      id: 4,
      src: "https://s3-alpha-sig.figma.com/img/72a9/4ca2/ac0828d6438b37174c54c9ce73763cc1?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qgz46~rhbB2Y-ZjDYIiH8lp66QYG1oixQjwBm1IOO~woMmf5vsAeaLXIoa5FUjrrowzrPGf9sknoU~pF0UeWVdlUYo3qQaLwnp~A2EV~~5fFTanAm5dZyKrF9yHylJC2zY2NgMdHv21D7DV3~nFHMxSNljDwHKkQu5wv6OFPfT1v9x8cmxD6WD1Nlo01BClU7Qju7uFHLV3sZiEMXe9Tb-MNt~kMEZO9Yx9dqXFfwXWXyYDobyjU05Uo48-Iqlanywvbm~pDiw~1TvwhHI5AcwfYY7eHQztqePkMJ9tdicOY~Yzd55QLT5Y36DwGF0d9A2JLjiQDKcmcYQ1kvHWpzA__",
      alt: "Scenic landscape",
      gridArea: { xs: "auto", md: "1 / 5 / 3 / 6" },
    },
    {
      id: 5,
      src: "https://s3-alpha-sig.figma.com/img/e59f/2055/9adaffae9bf06f3f516af4689ca8fcb9?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FWs89XBfA814g80iEwp0GrjSoKhv5dqjFuAGayvBlb7ZzqEIdKoYZwGyc7mjAXRLF5y8T-gfrHYa7vq1cSpBjLFyop0C2kT7sqxPZpkMf3KUHwapfGrJ4fNkYCwFh3WH~lIbhbeCj9jC9PvYGdezNKVVPBO-77GqKL3Akwqii33vjAywibFtJF9G091ewrscILkO6bMPIr0o-IImNJfaGN8Diq4Exxu~8B-CueSRqN363tZdtdTgO4dQ7TPkRo8t2eyQiCAXYJ3orshc6ASUHwYwqAoUvom4ZzHB3eE~bQHIuYaiIZWHcaZF971UM8z2aTzXINsyBBCMAUYnzsU~Ww__",
      alt: "Mountain view",
      gridArea: { xs: "auto", md: "3 / 1 / 5 / 2" },
    },
    {
      id: 6,
      src: "https://s3-alpha-sig.figma.com/img/d1a4/f7a7/e0d337c8a5dc24d80a81a94ea627bfef?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=A0lEb6v9DfAm9s~KChZW-xY~GvsEUI9zGvS-kxRfcftIgyqyrDgG3OSMw3~WAZocLebQY8fExH-MqeFx6NCKwNiZZQQIXHdIGnDVofYT4dkP32kzJVyn3hOyJ8LbgNhzjIu3rkEJ6pfrD8fUtJaG9oS75jI9VhcfsbLHLs64knJkkjtrQv~biGRw3Qp6cLrYWs-kRxbG5MbPnw-lgCBNfvFnUv9dtK4cR4v6Y0I066BOd~t1r9rDck5tnjVxuyLEU9mYiO91IoPZ9QIvuXzja-sCv2-~PGF2AZA~BAmkr6~FOyHt1jUZWkQmx6HC3-fuc4wM9YNpoYZCB5ff6P8dwA__",
      alt: "Lake scene",
      gridArea: { xs: "auto", md: "3 / 2 / 4 / 3" },
    },
    {
      id: 7,
      src: "https://s3-alpha-sig.figma.com/img/3d61/89b4/a0a1b71ff193fc895afda6186308eb1a?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iD-T7Fd9SL-Me9UPxIXPZN1QfMlOfP5Tb3HbQV7pWdNzamhmrRmfuUcISfaFLialLVv-~AXm38D4zlvN4k32Wmbo9tfsjioEHV1yiavHXQBsrJunv20JKLOjIWZEyAMz7QNIVVYr~YYe2ZCNvwzR2PWA0TmWb9jz8-G3youaxjKV1hWOiTP-AQ9HFQPXTT6nCCFHM3mdoq1qP270VHxdjVXiMJAG5dBeGk3NuJh7E1LwVRk0cZgWXEf4huLmY5uOU8KMk5rx3zMW0ghr~KYljdATcZxmQ9tO609Yg6scPeQ6K0bdGt8bqJZnFCfYa3zg4h7vBC~rIbUBGCS7wJzwzw__",
      alt: "Forest view",
      gridArea: { xs: "auto", md: "4 / 2 / 5 / 3" },
    },
    {
      id: 8,
      src: "https://s3-alpha-sig.figma.com/img/6944/9b91/5c87a4d60e7704438747f3ceff84de49?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GC2~Mfk~yxo0sc9zrO-LBA3W8eCWHFLu0Z982rQcrXsTWvhae~P7N-VUKZipSITDIqdXzAvrFgM13VNp3gqcZ9A9TLI9jtA2bo4eBhdICOVluKPSoNOcHi3CdVezljHIwlRv5DbCgfK0wX1wVMziMZLRlcNBqp9IiOLU5rPzCeX8MmHaUH68S4bpMlAyogB5w8lVSubC7PbDDB~84qjOhSwQnkOR7wxjbuo-GqezXOPNZKD-Aa6S-7F8rmiLdugdCu3k7tZ~FUyKlgLAKySl6q2uM3CUBMsWMLTzNzobrXIm-KkbLem1ckhAoFgeeevnWM~BKAM3Nk5hs7biUfhZsQ__",
      alt: "Sunset landscape",
      gridArea: { xs: "auto", md: "3 / 4 / 5 / 6" },
    },
  ];

  return (
    <Container maxWidth={"xl"}>
      <Box sx={{ position: "relative", width: "100%", py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 10,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            fontFamily="Montserrat, Helvetica"
          >
            Галерея
          </Typography>
          <Link
            href="#"
            underline="always"
            sx={{
              fontSize: "0.75rem",
              fontWeight: 500,
              fontFamily: "Montserrat, Helvetica",
              color: "text.primary",
            }}
          >
            Смотреть все
          </Link>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(5, 1fr)",
            },
            gridTemplateRows: { md: "repeat(4, auto)" },
            gap: 3,
            width: "100%",
          }}
        >
          {galleryImages.map((image) => (
            <Box
              key={image.id}
              component="img"
              src={image.src}
              alt={image.alt}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                gridArea: image.gridArea,
                display: "block",
                borderRadius: '10px',
                transition: 'transform 0.5s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.07)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  zIndex: 1,
                }
              }}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};