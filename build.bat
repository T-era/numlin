set DEST_DIR=dest\
set SRC_DIR=src\
set MODEL_E=%SRC_DIR%\ts\model\cell.ts

call tsc -d --out %SRC_DIR%\lib\models.d.ts %MODEL_E% --target es5
call tsc --out %DEST_DIR%\models.js %MODEL_E% %SRC_DIR%\ts\model\dead_end.ts --target es5
call tsc --out %DEST_DIR%\views.js %SRC_DIR%\ts\view\show.ts --target es5

copy %SRC_DIR%\static\* %DEST_DIR%
