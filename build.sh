DEST_DIR=bin/
SRC_DIR=src/
MODEL_E=$SRC_DIR/ts/model/cell.ts

tsc -d --out $SRC_DIR/lib/models.d.ts $MODEL_E
tsc --out $DEST_DIR/models.js $MODEL_E
tsc --out $DEST_DIR/views.js $SRC_DIR/ts/view/show.ts

cp $SRC_DIR/static/* $DEST_DIR
