DEST_DIR=dest/
SRC_DIR=src/
MODEL_E=$SRC_DIR/ts/model/cell.ts

tsc -d --out $SRC_DIR/lib/models.d.ts $MODEL_E --target es5
tsc --out $DEST_DIR/models.js $MODEL_E $SRC_DIR/ts/model/dead_end.ts --target es5
tsc --out $DEST_DIR/views.js $SRC_DIR/ts/view/show.ts --target es5

cp $SRC_DIR/static/* $DEST_DIR
