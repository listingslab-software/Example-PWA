import * as React from 'react';
import {
  useFeatureSelect,
  useFeatureDispatch,
} from "../../../Shared/store/hooks";
import { selectDiveMalta } from '../../';
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
} from "@mui/material"
import {
  Icon,
  routeTo,
} from "../../../Shared";
import {
  Featured,
  ItemCard,
} from "../../../DiveMalta";
export default function Category() {
  const dispatch = useFeatureDispatch();
  const diveMalta = useFeatureSelect( selectDiveMalta );
  const {list} = diveMalta;
  const fold = 12;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Featured />
      </Grid>
      { list.map((item: any, i: number) => {
        
        const {
          icon,
          title,
          excerpt,
          tags,
          image,
          slug,
        } = item.value;
        if(i>3) return null;

        return (
          <Grid item xs={12} sm={6} key={`item_${i}`}>
            <Card sx={{ m:0.5, minHeight: 100}}>
              <CardHeader
                avatar={<React.Fragment>
                          <Icon icon={icon} color="secondary" />
                        </React.Fragment>}
                title={title}
                subheader={tags ? tags.toString() : null }
              />
              <CardMedia
                  sx={{p:1, cursor: "pointer"}}
                  component="img"
                  height="175"
                  image={image}
                  alt={excerpt}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    dispatch(routeTo(`/${slug}`));
                  }}/>
            </Card>
          </Grid>
          );
      })}    

      { list.map((item: any, i: number) => {
        if(i<=1 || i>=fold) return null
        const {category} = item.value;
        if (category === "diveshops") return null;
        return <ItemCard key={`item_${i}`} item={item} />;
      })};
      
    </Grid>
  );
}
