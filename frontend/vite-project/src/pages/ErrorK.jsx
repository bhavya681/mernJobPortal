import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const ErrorK = () => {
    const navigate = useNavigate();

    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
        <div className="text-center">
          {/* Error Code */}
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          
          {/* Error Message */}
          <p className="text-xl text-gray-700 mt-4">
            Oops! The page you're looking for doesn't exist.
          </p>
          
          {/* Suggestion */}
          <p className="text-gray-500 mt-2">
            It seems you might have taken a wrong turn. Don't worry, it happens!
          </p>
  
          {/* Action Button */}
          <Button
            variant="default" 
            className="mt-6 flex items-center gap-2" 
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back to Homepage
          </Button>
        </div>
        
        {/* Illustration */}
        <div className="mt-10">
          <img 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPsAAADJCAMAAADSHrQyAAAAhFBMVEX///8AAAD29vbo6Oj7+/vU1NSvr69SUlLt7e3m5uaysrKhoaHf39+BgYHLy8vd3d2YmJhvb292dnaNjY25ubnFxcW/v79JSUmoqKiGhobMzMyQkJBdXV1lZWWkpKRXV1dDQ0MwMDA3NzcyMjIjIyNiYmIcHBwODg4XFxchISELCwtzcnNn4LhJAAAWRElEQVR4nO1dB3ejvBLVAEKYKqrAgBG4xEn+//97GoG7vZt8W+Ls456TgiEOg0Yzd4pkQmbMmDFjxowZM2bMmDFjxowZM2bMmDFjxowZM2bMmDFjxowZM2bMmDFjxoxfgpc5ly84/uLOZQtv+Vdu52+iBoAhPx5GMSCke33dXr3aGn/11v40fC1qfDh8hwM25sV1qX4x/Ov39yfRa5mC6UjCGfyzy8ZHBPQrbvFPgY8y1eNRAxc40/ANwMvV4/juwOF01Zenj1wtcWYRQgX+xo7XVWpaoCFwHr3RN8QrwMpTMtn6COXdW+MZPfEPlp2iEuzUN+trbvNPIMCxDXDs8Si7mORoCLbT76gN+sn8O7IvtTTxQfb23OCTHGUdf43xdet0/A/AGg13o0eVjCp/cvTkaNeVPuwIMf4p2eVo39kkux7YM2N2eN1UPxXRc/4l2dU8l/gTTXpBJuHOJnQ82cC38Yf5admf1ym4Bwd+kN24cuntaAfEZPI+LTtb/ca7/a2gR4YqJ9nJFZfr9fRPlNvTh5/VefG8HFAN50BzBMqY8MRB7gbl8QIt6wK/pyFeVuKxl6YffH/X/jP3/TuwgSv42tH3xwt08EKi68s2H3z/ZiWaZ53w/bVQkZ4Gx4Ff4EF1K3v/w3c9YZ0RJ/75ZV+C4Fb2MYobPby2bOjxri97+eD7Q21U43N8Qi5oGNNNoUSa20yBaptHyzFar8+vW37O1ski1m/qqMBgqIr7SQ/DIAal0ddlRM40vbwYYnlxmWb7H7/LpVb4TEJlGSEXsK9u8h5Zr5yI5Kv0Jkf0t6C1m08H/Ez04fI6fcq8+fOH4C2xoc8Oh7TuQXjn8b+Xkm1B5H++8d+A5WjUJuRH0aur694no/BhpNBfungjU1SxtSf5nYY4W+KI/3jbvwX+lrEuOx1n8Qb2jN/4p7Jh7BNeayHP46LTf1up0EnUuUE89RwD+Y9lPxFGPKWC7sHMgh52m3uP5vvDqpSF+8k1VIULgv9rKX+jgvcHmmyZ9GgtKSdFtQFWfsJ+PjmcBKq7kqeSdXF6Zuk1OzYyNf7sH0n/DsqUp/by3mBSj6dxfTwsDoYzOOYFvzkkNQseIztu6uLyCZg0Mm9VwoamCm5e/ZaIDyTNz1KmCFLg3itsHlHAmpLqsU/4VuD1+ZGis8qfy/SBPfc3On8Sfxmp/a3wpiy3sYbjQzDyFO35LS9KpziiKf7S3f1R8E2hA/xoPZS78xPangcXdMbYDNPs7/4JmsMrA+PctFEmTF7bNd8bQB6dXA5j+stobmOHbwm6J0p2UShvfhX20OY9USIWKmwNMMSJp2Ifh9qk4lkzPJ8CWECEbw83SdptIYNyQKbr1ypmnszCClplBkL2tQVeK2jQ8HhNYJHcT1RkTer2h+7pLlgIiyXcydFWLUn39pT8oGOMV4JU/6Hoa8K+dMYPJnErkhRkMRDO1L1mvkc+zzVrT+j8jHND7Py+oLCcAludBJEval54urOn/UpLH+JQMdKo717EF/pA/IfumlWFztpiSdLcnOOxA277jr9igY9AkpT9+D+arxz3e7KT+vP1hbJCcrMp8zy5JaqhIHG8Qr0fZbfSA6FbfyYh9Nshlc6nJCiIL4jXWSTITdMJiEcWBSk+HmbaSRaToimzrBhuz1JJFM0xj7J3hxOfSQT+flhVi6NctsrrchrEITGCxCKxir4I//io0CGSxNUpsOCOPMtukKgPo+ynROUnEsB/GPXn7fsR4AOxdoaShl2mbpw6UQ/XZWPZE60okGMz0/MU9n+lWAAZWMRhcXw13ykUVvZyeONR9mPRynge2X8FdOzOMuiV7qyjWCyOwqJ3Uw/g8HicC9mdDvZT7T7P8uUXlm0+jTW/86LPMXnbHJT8VctOD6GeeS67BdwKARJ0e7r6CbDfZuRbwLtXoncCS9l9R06HGy17cSr6nl0aozZESSmhtYFk4BGHunCRFvjjcLR19x/VI+gjCs7vZqCYrUY+OAyf5vtQHg6X5/5w7PnBeo3dK55v6ELpX7YIkR6V4NFs8x45vvJ+UJYObDjmpiTaBDim55MzVcml/sGIDJbEVRx4qcXuf0cLC/WrLVJor+HUJIu4jdQR347/PStab4prjJYpvmmuE4PwRmkcen+buFGMwTZvvPKR7MUtm71Bi2MJ1fQW6Xl7l62TtosAVyvIIFMjr4O89nfMeHdQwngkztUsixxpES7IOyULfcfqMXsFxjVlehr3Nid0pLuK43NCU9KG6o8fBTr0DqG7Ro32EDT7MStg57qV68RPP75kBlCSN3QZVfIf5T2HjYrGSKu+r3zNYhqlfSnf49NVs8zkdOT2dJLdQB1OHfyDTk/DhuArD3VeG66fxGWlJndKpRYtDJdFS0txPEPZg3LUhYqPpG+lGxx/ETZOnFH20tdRS6cOrPE/bVH2pUsuZMfIK9WuudGjv/2x7NoslTi1F3XC7xN1F98B1qsOYFjJS3XmoBN5ebdJlWqJfHSAq9SDX07nos57WudNiAxhGkFHYkp8SbRwxEyJdDCuoZpfqLFplyRipCxJWGnZmx/rvKXvNR06GVODtt09f+Dioy9k+yryshNX4SIu2RFcDVEUDBzIWLngtSt2v9qtaIeVthtei7bO4rXRYpPEaOtszCgrW9eqMTe1FcaVBHyL3tU7WTx1PX/o46xLd2TKGtO0lxn6QpOcjIUlK9Kzpr4DnDzttSms4tHUKVvn1fyjzX2PUJ7fRdQZpPrNORPr2hUXndhmteTuaZbk2h7mmXRrsahuZTe452InGAdrO9IFMJqih+DXqpb+xXiZdfq7ez8NuP8waVYLObk1+qqv5BV2ngY3quzABuqa8xfI7PFJLl/U+IOTnnXwPCWKAZJHD3Q0IiQaJYr0ZcONKvc22cEwQE/LKbLvsoTXqAFZD/VTBzdODZD+KOHhn+aF9XLLA6F3FKWOiMX2x8QuqAhxQEuvTGH33Ov0/ArgtqXugFPwYsKdsI/r7vXoHSMYP3OVCcFVmZQUAmJUlXID789YxzILL2F93zOoVfipfdUtjrJnd7uxCAMB8KaU2wZo9wF44fQ2hnostYkspIf2qUafcqZc8xAUdM0gk5FYrtXwN7ctNYdkRfsoSfk+EhnvlWJ3woWDjALo0dU63gs8y/KEPIa3Ksk0QSpiKF1jba5JQ8v4/boEO8lO4XEdjgrYyV5XKf23m3/VgG4JpPIppF/BGsuPdqGDgiqHbKgXKQmWyjqzqFP6IFcn76plD36ytJjm1IuJSd17y/JcCa3SCV9++RrdDPoF8ajuHEPZAxSOBoqt+hnpF62bglcE8BKXIznB0/ID7aQBbAMvvE+fDU9xH2PIv3iRbgM+c7TcZK0GfUHcbJzQruhKSmiYUB8g5nW6Vuqv1CPqDeTs4c9ue8wFPMxbUJxNr383nXUJB3uMrR7ltpbbflqRcSAgYd2J2LXCRb7jUhm+IIVNab+Ax1JcWr1btz9Q2gxjnjHL8wCR/ZULcxZQmnFFysxpFftIszHIudBEI+8aSlVYbrJCRYkbBm3bOJgiSmK//EF3tifV2zhvXz2lH2GhLVawDJX6nY3PcDVWTj3UPln6ZOf0JokGSnufhJuQmEPyuOWkTWvRx8+67N6AnWfo5SaXQUZzG3PQYGgwPemTICaY9msUQeedcogP3310/8+6/HqzMpZMmbbrODS5DUwVLOqt9ShzpSzCJ4u1mq13qtUTCt1zaz5pxQo3DoBmuKVnU6/kna665fqYyOLCICHsHrroXYMWM+senP5iwL6JlHe/Hbl69DyQyNVNyEkrUWNKamNjz82SLO/8PYL3UTwkq/6uCn0topy4HSl7rDjfzG5vFEcgARWXZ/2qootaSvTdFDNS3vauOct0tspcPuEuGyqe9tu9YEkDymBfn7VHA6a5m1Wu349qHUowzVSdXeJwYhgXeNhpeGPs+cTVS3Z95uvxFqZjVqWH/LZcVoyTVLCxWXZR9ZUWn7ZNosYRqXiAvE9diRqSx/FlCjrcSdLq0P7LCfstlPUthRYZZG7fmCN035anZuwgofNQa6NaijQUJD3UbdTfNOm4fsIX2IQGU+7QVNRfpzTs14IEHyhx/W0spfLtfcqYUJT2xs4vhr03QOg3Avai20EzShW5L4xV0/ztkBZUOQ431qEcZtb7aXFevbA0myXuyzM6d0y52ZBQWkPIr6NRR6rTwnVJYAIoMdYB9Cv9fNTk9Qdt2Cw1oNxu0Mrl6BB7C89apXoWrrICuvdA2YFfr0T9AbzVOI2ZCExiRlB3m749CyuUBejygPBIue8XYAFP3uGtCwo0fsU4sweM0+JE+YhYmQ2aYmcG0ZGwhVfhbK+elM460Jc0ourmVrHIwfOpzc7SKGC5HCshMmD77Tretixog7qAtiDlqCVrXFW1bTkEKCo2pvlKfhdt4zuKXOyBPaHCj1Am6bUBoB41WabN8eLtuORpp2d4kclE8pUrawYx5G+K7LB+P+qxxD8oeLJ+w1Z61HNTmXwTnaMlicOhf6pk5DXCfUuV1BtSenQsx/SHQsPYSEdXXZrEzeC5HYMU+rhNvEqMTE8SfDYZ7zu/hUSXxtBdqLNGyGDMRj8zEkkggDwmjb8A6CxiHVhYrCe/mbZbSDLKqwDqN4gbr0rtycnpdcCdZ+ImAQZfqwfD97aXdrj0/n5q+8nQQaLun3PlpmxA3U0ngjYGckYSDFEa7/lqAywVuzhNWD2RwApV36jERIitpV1XScXd5fNx2AfANglwAltxlBYXP9NJsqnCuPVE73k5T2rZMUXjO7Hzxg1zyArH1nLI+3ddIqaryRkYbe4MBmafDtF2OtaaOld27wHjA24dQkvid2qOjFcUerwT8fLEW+H8EDpeqwEWwo/WNWyP5aYpkIuLIBA9Ebsg9rMg7EnbHGRfTi1n9b1GzO+AFOP0QSTgbIxwSwI48O+xtcII8jRJQMq+6t1haFb+WqaT7HSSffVdl8Nq1d7wCnqyJ1lAykM4No6/k9L3t00ioJJZ2zRhR8xdMgU+0TTe2RNGKx+CVu33oYvbrdMjCbdflLPGM1p2q62hLNj7ZhiEjBlbsvVLKz09040xXFER/dfc+i8jR7O+BAYEUr/BbUtc228lmXKs1X4vBK2M/aZnEpx8s47LpvfHfmM5vgX96D5RTwctYqeorZrqeTBFXZtsrE6k7hBYVtk1b1UQQwm7PUuStiPOKxL27cjvot3DN39ycInfbVznKgaThGvc62+50bI7yt5lyaDmtfsm3GpTJckArmjD5JULXJej38H/6B5Zz4fhVFqoxAITcPslTnZFbrOx42rJthEJG9imZcBgCIIS23Jjkh220fqS+/4tGPqpoOZDaKP9AuJutOz5IUHrpINnEFe8eFueVjVBZV9P5OZy5cB3Q6nUvGUD0nkLhq0BDWZbMKh5PVHzZSxLYmT1RnjTiv+DWjxr3eWDoLabLxc20pkCiG5GJrsNN63teZ9h3gp1xj+2SNmHvfL+7s3+GWBE5k6S8C4MYH3dYll0XXhcajjN928pu5FdRdkmSJDTa7vMschSjOudzmCV+0ORShH6KBDiO66O84BtoLUvou18TFZb9qBzzYlheAMMD3p2fd6qGJ59P9kLwHUdhr1VJu4q2eDHIN1W2oKvdJWxbva7e6k3XZoi3feSvVRMJnsJRKX3ZYoq6Ogpoar03IsajzhrXFYtBBblghTEbRehWWH64nvJ3g8VhNgN4buatOFKp6nZyfH2oPf5SNVcjnEFxrokWychXQXtdV+NGYTK7nfON5LdkLqNKh7D77yvHd6M1j3aQoPkHFeXCQerLIMiPFYSVatVHaRvm8tavJOgNxTfSXYFZcLJ8tDqSdsY03bWao89oiYGdntdZymX2FsCBi62MWCR4E735x1lVlxwLqozH2eUSfq05YhznOpFitMMHdYbcRkEVeat1K2ltMYqk2J5ue9CtvVCQ7fJnlKTDcVHER37ZUuI3eS2j+EJkR7bBVqHxG2kojiCYjCLGFuUHWupMoW8Fi8dx074isVgUAbVFOoiD6SnrS0LcJyALp77E3wsPW1PMciSk1wdbFS44vGGlbrfQmLCSkIyOsCyEywo/BXAq1C+f8PHZXokBvuo5ANVb7GbFhI9JQrNWlBxT05b3S20ZKHCUnjP+Au0a4dsSQUvthdLUdljryUH2EPS9mUDca2Iz4JHDQOZHD7MS70F70pCn9f2oUpaEpmqd4zcY5Mkavp3b4DlZOLYLSh6m0BdoHab+Spo5R7YUCvbzs3B9DcNFhsVFjwgRSJxdbgDDJqqYk/8sRbQv067cp+cU+ERW1bEBjdMJONoBMMOVgszq1shWp77qf5Mg0xibz22mbCYOIHx6oiFXlfiuLpFM7EDO+RPq/MGtDGPx96no6V3YrLsGFlKiUc02GD8toJNGmqrFgDUTr5RUzxMsMHGVJdBlGduTrrFnvhlqzcDcFLYbd8/t/Pz3wVP08Cblg4fQ1ShlCAwqHeowtZ9mVQECrdONhKaXLdk9Ork1iSecvsZKZPQdXmZ2Bv5vjp6y9B2n7PT4gbe++E3qQYy9sOiOtaXMOuunk3OYIev4UIap9OUB+sxPaFrQ8303MBNz5bfcNNG57hCIHaUYpOggVO+Wbm5VOiPMNG7lOlWIku/zHBRCYUBspBDVjZ3+mW/AbnjIMciambjdqvgWafJ6uJLRoj79WESOudjT42O60gWvCShHcukul4BrlHDncXRT4dQgIxdSyk9FxFhKTsVFhWxg5SY/Sg3TgvcRkBiljKFOCvfL9pIT9VYx30bLFM8aYvVCUFd8pQzGPY1LBVvo/nJOXcGaZQauOXYO8jGr5bkbxDU28OGloWiC4ZvJaKdShTYu6I4AXue/b3uwl4Qx1+WiucsUxWzRsUq6E6hiJoHGRNacCS2+CWIHfebQWJj0bSfxQ54Am8gR9JEcK+QRQcx1M/LcDSyCj+MQInuoGvLt6KiyncdzlqMmJD6KDQ2zbUGMRob4E05OPOQxNEL5UZvcdjPYqGmehD7z9hHewtsikyEaDyHOB4TpxWcApugOXbOhVrvrXdczWcssoMVd6SAfUgWycCUydtOWp6zXhHgR3vYPydoIOPCOlvZs7XIi89IbmP1yerfQSx8NzhZOMsnlYRoJfebF4AVCQ50oWi+cr3f5xHHvFgYhZrwx8xMGpE4U7K7JI7K9d4O08vPVbPSTkBCVEQXLSiuQHhaIv8zGH5RC1GV7TG6y1yStQ3xIhW1t+WWJVc90aEKawKPtKPIQJawena/9giFl+NnJJUAbCoyvisPH5vYFO9lSqrrnfctn2veZ6+T0h6Ulc93v7qLy1fBoW4y4NrIRfE6bjo96E+h6yJimMvqdkitpgfhgjSJk4fYMD7c2wDi+2DhCalU2eR7SPJVyNbWolSe8MHGw3ZQghu/KBMRBSB59+vbNn01fLsRdWZy/GzCmol2hR9AcPfKJWDncDJ0qexSaHebbxDD/By+TmqJUJEe6we5CKf0DMsdKrt/+9Fa8O8IWibvP7+KtBv5tTsTfyHM8Pv0jc+YMWPGjBkzZsyYMWPGjBkzZsyYMWPGjBkzZsyYMWPG/yf+B1xZRILK/x1fAAAAAElFTkSuQmCC" 
            alt="404 illustration" 
            className="w-full max-w-lg mx-auto"
          />
        </div>
      </div>
    );
}

export default ErrorK