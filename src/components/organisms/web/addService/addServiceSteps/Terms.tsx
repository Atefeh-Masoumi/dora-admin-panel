import { FC, useContext } from "react";
import { Checkbox, Stack, Typography } from "@mui/material";
import { Document } from "src/components/atoms/svg/Document";
import { AddWebHostContext } from "src/components/organisms/web/addService/context/AddWebHostContext";

type TermPropsType = {};

export const Terms: FC<TermPropsType> = () => {

  const { term, setTerm } = useContext(AddWebHostContext);

  const termInputChangeHandler = () => setTerm(term);

  return (
    <Stack py={1} px={2} direction="column" alignItems="center" spacing={2}>
      <Stack borderRadius="100%" border="18px solid rgba(60, 138, 255, 0.04)">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: { xs: "120px", md: "196px" },
            height: { xs: "120px", md: "196px" },
            borderRadius: "100%",
            backgroundColor: "rgba(60, 138, 255, 0.1)",
          }}
          p={4}
        >
          <Document
            sx={{ width: "100%", height: "100%", color: "primary.main" }}
          />
        </Stack>
      </Stack>
      <Stack
        border={1}
        borderColor="secondary.light"
        spacing={2}
        borderRadius={2}
        p={2}
      >
        <Typography fontWeight="700" fontSize={17}>
          شرایط و قوانین
        </Typography>
        {[...Array(2)].map((_, index) => (
          <Typography key={index} color="secondary.main" textAlign="justify">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
            راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
            حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
            طراحی اساسا مورد استفاده قرار گیرد.
          </Typography>
        ))}
        <Typography color="secondary.main">
          برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
          فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود
          در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
          حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
        </Typography>
      </Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        spacing={{ xs: 1, md: 0 }}
        width="100%"
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Checkbox
            sx={{ p: 0, borderRadius: 0 }}
            value={term}
            onChange={termInputChangeHandler}
          />
          <Typography color="secondary.main">
            {term}
            با شرایط و قوانین استفاده از سایت و حریم خصوصی موافقم.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};