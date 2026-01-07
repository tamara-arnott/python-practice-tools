import os

files = [
    'HigherEd_Level1A_BasicLists.jsx',
    'HigherEd_Level1B_BasicDictionaries.jsx',
    'HigherEd_Level1C_ListsDictsTogether.jsx',
    'HigherEd_Level2A_SumAccumulator.jsx',
    'HigherEd_Level2B_CountAccumulator.jsx',
    'HigherEd_Level2C_MaxMinFinder.jsx',
    'HigherEd_Level2D_ListBuilder.jsx',
    'HigherEd_Level3A_NumberValidation.jsx',
    'HigherEd_Level3B_StringValidation.jsx',
    'HigherEd_Level3C_TryExceptPattern.jsx',
    'HigherEd_Level3D_ComplexValidation.jsx'
]

for filename in files:
    with open(filename, 'r') as f:
        content = f.read()
    
    # Add ChevronDown to lucide-react imports
    content = content.replace(
        "AlertTriangle } from 'lucide-react';",
        "AlertTriangle, ChevronDown } from 'lucide-react';"
    )
    
    with open(filename, 'w') as f:
        f.write(content)
    
    print(f"✓ Fixed {filename}")

print("\n✅ All 11 HigherEd files fixed!")
