# ✅ TESTING CHECKLIST - PYRAMID MAHASISWA API

**Nama**: ________________________  
**Tanggal**: ______________________  
**Status Server**: ☐ Berjalan | ☐ Error

---

## 📊 TESTING RESULTS

### TEST 1: GET ALL MATAKULIAH
- **URL**: `GET http://127.0.0.1:6543/api/matakuliah`
- **Status Code Expected**: 200 ✅
- **Status Code Actual**: ______
- **Data Count**: ______ (expected: 5)
- **✅ PASS** / ❌ FAIL

### TEST 2: GET DETAIL (ID=1)
- **URL**: `GET http://127.0.0.1:6543/api/matakuliah/1`
- **Status Code Expected**: 200 ✅
- **Status Code Actual**: ______
- **Kode MK**: _____________ (expected: PROG101)
- **✅ PASS** / ❌ FAIL

### TEST 3: POST CREATE
- **URL**: `POST http://127.0.0.1:6543/api/matakuliah`
- **Body**: SECURITY401, Keamanan Siber, 3, 4
- **Status Code Expected**: 201 ✅
- **Status Code Actual**: ______
- **New ID**: ______ (expected: 6)
- **Message**: _________________________________
- **✅ PASS** / ❌ FAIL

### TEST 4: PUT UPDATE (ID=2)
- **URL**: `PUT http://127.0.0.1:6543/api/matakuliah/2`
- **Body**: Update nama & SKS
- **Status Code Expected**: 200 ✅
- **Status Code Actual**: ______
- **New Name**: _________________________________
- **New SKS**: ______ (expected: 4)
- **✅ PASS** / ❌ FAIL

### TEST 5: VERIFY UPDATE
- **URL**: `GET http://127.0.0.1:6543/api/matakuliah/2`
- **Status Code**: ______
- **Name Changed**: ☐ Yes | ☐ No
- **SKS Changed**: ☐ Yes | ☐ No
- **✅ PASS** / ❌ FAIL

### TEST 6: DELETE (ID=6)
- **URL**: `DELETE http://127.0.0.1:6543/api/matakuliah/6`
- **Status Code Expected**: 200 ✅
- **Status Code Actual**: ______
- **Message**: _________________________________
- **✅ PASS** / ❌ FAIL

### TEST 7: VERIFY DELETE
- **URL**: `GET http://127.0.0.1:6543/api/matakuliah`
- **Status Code**: ______
- **Final Data Count**: ______ (expected: 5)
- **SECURITY401 exists**: ☐ Yes | ☐ No (expected: No)
- **✅ PASS** / ❌ FAIL

---

## 🔍 ERROR TESTS (OPTIONAL)

### ERROR TEST 1: Invalid ID
- **URL**: `GET http://127.0.0.1:6543/api/matakuliah/999`
- **Status Code Expected**: 404 ✅
- **Status Code Actual**: ______
- **Error Message**: _________________________________
- **✅ PASS** / ❌ FAIL

### ERROR TEST 2: Missing Field
- **URL**: `POST http://127.0.0.1:6543/api/matakuliah`
- **Body**: Tanpa field "sks"
- **Status Code Expected**: 400 ✅
- **Status Code Actual**: ______
- **Error Message**: _________________________________
- **✅ PASS** / ❌ FAIL

### ERROR TEST 3: Duplicate Code
- **URL**: `POST http://127.0.0.1:6543/api/matakuliah`
- **Body**: Kode PROG101 (already exists)
- **Status Code Expected**: 400 ✅
- **Status Code Actual**: ______
- **Error Message**: _________________________________
- **✅ PASS** / ❌ FAIL

---

## 📈 SUMMARY

| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| 1. GET ALL | 200 | ____ | ☐ PASS ☐ FAIL |
| 2. GET DETAIL | 200 | ____ | ☐ PASS ☐ FAIL |
| 3. POST CREATE | 201 | ____ | ☐ PASS ☐ FAIL |
| 4. PUT UPDATE | 200 | ____ | ☐ PASS ☐ FAIL |
| 5. VERIFY UPDATE | 200 | ____ | ☐ PASS ☐ FAIL |
| 6. DELETE | 200 | ____ | ☐ PASS ☐ FAIL |
| 7. VERIFY DELETE | 200 | ____ | ☐ PASS ☐ FAIL |

**Total**: __/7 Tests Passed

---

## 📝 NOTES

```
_________________________________________________________________

_________________________________________________________________

_________________________________________________________________

_________________________________________________________________

_________________________________________________________________
```

---

## 🎯 OVERALL STATUS

☐ **ALL TESTS PASSED** ✅  
☐ **SOME TESTS FAILED** ⚠️  
☐ **MOST TESTS FAILED** ❌  

---

**Tested By**: ________________________  
**Date**: ____________________________  
**Time**: ____________________________  

