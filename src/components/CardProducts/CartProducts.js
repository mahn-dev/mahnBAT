import classNames from 'classnames/bind';
import styles from './CartProducts.module.scss';
import { Link } from 'react-router-dom';

import Image from '~/components/Image';
import { CartBoxIcon, HeartIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function CartProducts() {
    return (
        <div className={cx('wrapper')}>
            <Link to="https://klbtheme.com/partdo/">
                <Image
                    className={cx('cart-img')}
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBQVFBgUFBMYGRgaGx0aGxsaGhsYGxsYGBkbISEaGyEkIS0kGyEqHxsYJTcmKi4xNTQ0GyM6PzozPi00NDEBCwsLEA8PGBIRGDMcGCEzMzMzMzEzMzMxMTMzMTMxPj4zMzMzMTE+MTE+MzE+ND4xMzE8MT4zMzQxMzM+Pj40Mf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQcDBAYBAgj/xABGEAACAQIDBAcEBwUHAwUBAAABAgMAEQQSIQUxQVEGEyIyYXGBB1KRoSNCYnKSscEUM4Ky0RVDU6LC4fAkY8M0VHPS8Rf/xAAYAQEBAAMAAAAAAAAAAAAAAAAAAQIDBP/EABwRAQEBAQACAwAAAAAAAAAAAAARAgEDMRJRcf/aAAwDAQACEQMRAD8AualKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKhdp9JsJh2KTTqHAvkF2ex45RcgedBNUqutp+1jCR3EaMx+0wW/kFzH42rncV7SMfNph4GUc8oT5uTf0AoLlZrandURjOkmEivmnQkbwnbI88t7etUntLHYyTXFYyOMcizSMPIMbD0FQzz4QmzNiMU3LtZfQaaehqpVtbT9qmEj0jXOd2rC/oFDE+WlRH/wDScazAx4NchJuzqY91t2Z9a4ZMVMlhHhoMMrbmkIDEc7CxPwNaeOxEbi2KxryW1yQpZL+ZABPiVoLJxvtYyrbLEr/ZLy29AF/Otroh7UocRIIMSBGx0SQ6K591h9U8uB3edH41oiw6lGVbbmYMb87gVgoP2HXtcl7MsY0uy8M7sSwV1JOpskjqL/wqK6XEYyOP95Ii/eYL+ZqK2KVrx4qNhdZFI5hgf1rODQe0pSgUpSgUpSgUpSgUpSgUpSgVr4nEJGjSSMFRQWZmNgqgXJJ4VnJqh/aj02/anOFgb/p0PaI/vXU7/FFO7mdd1qCT237QJsRLmwjskCkqAOy7kfXfiARuXlv10G2enuMeILG0YkG9mTtMPDXKD6W8qqDDYl42zI1id/EHwI4ip/B7SjksD2H5E6H7p/Q6+dVH6BlVJozHJfK6gmxZTr4qQR6Gq/297PlAPVOMpN8khOU+AddR5MNedfOxOm7xhI8SmZVGXrF74AsBmXc3mLeRrvcBtGOVM8ciuh3219GHA+BoKWx+y58M4SPDxRta5Z+NzvUqLMvjc8fKtWXZuKdssuIc/ZjyoG8icob1FWp0l6KddeTDyBZALBJCzR87Kb3TXzHgKqLpDDtWC4njkjUDUot0tc2u63XgeNBux7HwkZXrAM7busa5JPNb2+VTMUaoLKoUclAA+AqrWYnUkk8ybmpnZ+3ZobK3bTkeA+yeHkaVI7LG4KOVcroDyO4jyI1FS3R3ZWygQr4ZRJoLyszo3x7K+oHnUBs/a0U3ceze4dG9OfpW6y1h5MfPMvefi51O+nU9IfZ9gsSM0ajDSEaNGoEbfeQHLbxUg+dVX0j6HYrBEmZCUvYSR9pD5nep8GA8L13mzNsTQaI109xrlfTiPy8K3MT0sxThkjiVVIsdFykcd+a/4K5/HnzY18e9ufts1rPeX11yXQzFTrhiomkEbMciB2AUjvMLEbzw3aE7zW7isKzjVmBP1rnN6G/53HhWCTEpGCHniiF75I1W9ybm4ObU+Cr6VpnpFHciCKWduJ7RHzuQPAACuxrbQ2cwteVyQb6hLeoCjN61twNIndkdTzRih+R0rNhsxjDyLkbKCVJA1tqBc238zWljtoRIpMkliN6I12I5E2BHoaMXTbI6YYmB3aZg0KqcqkyPIWJFiTlY6a3tYV12wum2HnTNJmiN7XdWVCLA5sxFlGtu1bdVQNtqKMBYw8lxmuzCy3+re9zbzrJgcVDiipcHOgt1ZdwMvgAQCuvzqRa/Q169ql9mdI8XhTneVSg7IjVJZAQd28kpax1zAa1YXRrpZFiwFsY5dew4KlrfWS+8Hfbf+dItdNSlKilKUoFKUoFKVp7SxyQRSTSGyRqWY+Ci/wDtQcB7Xelv7PF+yRNaWVbuQdUiOlvAtqPK/hVGAcTW9tjaL4qeTESd6RixHIblXyVQq+lfeyNnPPKkca5mZgqg7ix3A8lABZjwVTVRsbH6L4rFAmGMsAAb3AAB3Ek6C/AXud4FtajcbgZIpGjlRkdd6sLHz8R4iv0dsTAJh40w8eqoO25Au7nvOfEn9BwrzpB0aw+MjyTR5rd1xo6Hmp4eW6oKBwG2Wj7Mgzpa321HgePkfjXRbK2gQ3WYWUqw3gaG3JlO8eelfHSP2e4rDXeIdfGNcyDtqPtJx81v5CuNF1NwSGB3jQg/pVF5bD6bq1kxShG/xFvkP3hvT5jyrslcMt1IIK3BGoI5jga/OWE2+40lXOPeFg/9G+VdVsTpFJGpGFnGUgkxsAbE8cjd0+I+dB2O2+geCxF2MXVufrxWTU8WTuN8B51xW0vZtLEGkMyvEN5RMrAc2VibDyzV0EPSnFyR5Q6K/Byg/CRoB5i/lUXi3xbqwmnfM2gOjIvLKui33G9vAc6JUJ/YWHi7dhlBHbcjefAkDnoBfQ768m6RQrZVZpW5IpAJ8Ln+tSUOAY5VkkMiAG6soOZibhmvcabhYDTnWvtJREv0MkUXNSqa290Adk79W03buNVprjMZJ+7wyovvSG5Hpp/Ka08XH/7raA8Y4/8AbT4ik+MiPf62Y/8AcfIn4Vt+tYP7Tk3RIkY4dWig/isCag3cDhMOpumEkYe/NlRT49ogEeQ9KbQ6QyR9iNI0HAqcw8uFvKo/q3fWQ3vr2iW152Onyr6mgUplYaUEfittSv35WPgvZH6VqQ5nuFRmuLXFza/E/OpiCONALQpf3nu9zzsTb4VmmxjWs0mQclIXf4C360EYS1yq94CxtY/kSK8gjkjYSajKc178ta9E0aXy3N9550/tC/ZyA+v+1BZEq61p4jFxxSIjMQ7sAgG/U2z+A5fLw5JukmLCBAVSwsHZRnsPE8fEC9Oj6M+JWRWaRwSzu1yBp9UnUsd1zY8hxFqRc+xembBFSZQzA5c7PlBXm3ZOo58a6LZXSTD4iV4I5FMiAEqGDAqfrKR3hwPEcRVXxIWk6td6dqQjcl1OVCffYm9uABJr62fszqMbBiwSmVx1h1IMbgq17ajQ347qkWrqpWKOQMAykEEXBBuCDxBrLUUpSlAqsfbbtcpho8Kp1mfM/wD8cdjb1Yp8DVnV+dfantMz7TlF+zCFiXzUXb/Mx+AoORRCSABcnQVb3s22EIYv2tl7cgKw88htmk83IFvsKvM1w3Qro8cXOqMCEtnkbUZYQSCL8GcgoPDMavTCoCc1gFUZUA0AA00FEZ4I8i24nfX2HrxzXyaDJcGq09rmysMmHWYRos7SKoZRlLixLZrd6wG8+FWMXABJNgNSToABvJ5C1UJ056RnG4kspPVJdIhzF9XPix1+6FFBy6rWVEvqRRU4CtxYjawqjGmKkUaSOAOGdrfC9qzYbpRiwcqyZlOmV0VgflcehqKxkoJyLuGl+Z510/RnZkcYE0w3aqp4+dBJS7MxssRnYZUtcxoSunEovLect/K+6uYxMdu0d4rqtq9KXfsg5VG4CuddxJf8vA1RgRFYXtcfAevAV99aF7oA8eX6fOoozuSQo3HgL/8A58qxOCT23Hqcx+V6hEm+0AN738F1/wCfGtVtom+gPmTr/X51qlkHAt59kfqfnTryO6AvkNfibn51CNkySNqBlHOwW/rx+NYcijvPf7oLH46D5mvqPBSvrkbzbT89/pW+uxMovK4QcjZD6ZrE+imgjWkT6qE+LH9BYfnWfCpNJpGGtxyDKv8AEQPzqYwODRv3EEk595UJXTmzjKvnkFb00Mo/eywwAfVLdc/4VzBfQrVHmA2JhI0D4hmlc6lEvludy5gQGPPtVOw4pFUK8kWz4fC0mKdfsIoJjJ95gCDuvXNPLApvnnmbmW6pfldyP4qwf2kyfuo44/FEBb1drt86osKHpRhIYwmDwEzquoaUrCrMd7sxOZ2O8k/7VEbR6cYxrgS4fDruyQxiR7cizC1cXLPI5uzsx8STWDOvE/DtflUFreyTpPI074OWRnRlZ4ywAKstsy6cCDcDhlPOrdr8/eykZtqRWBFkkbW27Jbh5jjX6BqKUpSg9r8y9LorbRxSyCxM8hNvdZ7gjzQr61+mq/PntVg6vakje8sbj1QL+aGiddt7NokOAEiABpJHMltbZGyonkECW878a7NHFtKoz2f7Qmgx0cMchVHe0iE3R1ysQbHjYCxGu6rysG3aH5UH3elYrkbxWntva0eFgfESd1BoNxZjoqDxJsPieFBxntV6SdXH+xRt25BeQjesXBPAuR+EH3qqQfM/lWxtDGSTyvNIbu7F3PDXgOQAsoHICvMJhXkcKqkkmwAqj6w0RYgAXJqQ21bDp1Z/eMLke6PGupfBR7Lg62az4lx2E4J4nxqtMTiWlkaRzck3JoM+zIhmzvuHPjUpiscz+A4eVRWHBYgD0Aqa/YWUXcZBzchB/mIvQR6revsoRuJB5itp2gQdqYH7is/zORfgTW1hMO8ovDg5HXg8jZI/M90D8ZoOXZHYlVDsAd2psOF7aCtyHYMxGZlCL7zkAW89w9SK6NoWTSTGQxW/u8OnWv8AEWA/Ga1nbCqcywPO/v4mQm555Et8CxpCo2LZkAYK0xdjuSJS5PgLXB/FU1Dst4xcYZIRbvYmQR38cg+k+dYW2xMFyo4iT3IUWMettT6mo124k38Sbn4mgl3kiW+fFu1/q4dBCPLOwLsPMVrDHxIbw4WNT78l5n87t2QfIVFtMPPy/wCWrGZW4ADz1/58aCTxW1Z5dHkYj3b2X0A0rRZgN5A89/8AWsfaO8n00/KvViAoBlHAE/IfPX5V8kseQ9Ln4nT5VlCivoUGDqr7yT5n9K+1QVkNeUHcex9L7SvygkPxeMfrV71SPsYW+NkPKBvnJH/SruqHClKUV5VJ+27D2xcL+/ER+Bz/APersqqfblB2MLJyd0/Eqt/oNBUiSkOkgYhkKkEG3cItrwIsLHwFWt0b6fI9kxGh/wAQD+dR/Mtx4CqkNeo5BuDVR+mMPilcAqyupFwQQRY+VVT7W9qM86YVdEjUSHXvO4NifupoPvtUD0c6UyYZyykdqwfS4YDdmH+oa1h6cbSXE4rrkFs0cYIzAi6rY2PLdvt6UEdFgySqAamxPruHw/OrH2PgY8BD10gBkIut+FV1szaLRvmzZTf6w0+J0qQ6QbamlXtSBhbTLa3yqiK6R7Skxc/FmY2Ub7knQCo6aAoSLqbbyNVv4H63n+de4GUqzODrawPEZ9CR6Ej1qZeePLBGidpc0jsR3mJsnooB9TUH1hdjYrIGkmGHVhcdZIUJU8QiAsdOYFZE2bgozdnmxDfYVYUJ+8xZz8BWGacXLO12OpJNyTWs+MH1QT8h86Caj2iI/wBxh4Ibbmy9bJ+N7kHytWrjcXJKbyyO5+2xPwG4VEtO55D518FCd5J8/wClBttiEGg+VYXxR4D418LHUjgdjSyxSzIq9XCuZ3ZgoF9yjizHkPDdQRrSOePwr6TCOys4Riq72sSB5nhwrpcR0SlXC4aZA7viGACKmiK3czNe2ZrqQNNCeRqZx3RzF4TZ8hneJFGmUXd2MjKMpsMoPiCdL+BoK/VK+gK9NBQeihpSg9r2vL0oPaV5XtBY3sTX/qsQeUS/5pD/AEq6Kp32IL9PizyjiHxaT+lXFUUpSlAqvfbRBmwCv/hzI3oyOv5sKsKobpTsVMZhZMO5tmsVPJlYMpPhcC/heg/MJrypXa2w5YHdHQhkNnU95b7m+2h3hxv8CDUTeqj2vc1eUoJbZD2exrc6QQKBfIo8QoqMwJ+kH8P5CpzpAn0YPhVHJ4UAq4IH1Tu3a20+NZ8VFZ0ALWMYI1J4m4B5Vhwe6T7o/nWtzFd6E/8AbPyc1BgWICt9tlTBVYwSgMcqEo4zta9k07egO69S/RjpDJhA6xQRSSSFQjuCxQ6iygWOpI4jdVszbaeOWVJCpTDYUSzPazGVgSEXWyjKjNaxPaWgok4dwWBRgVOVgVIKt7rC11a+ljrXRr0GxixNPKiwoiM7F2s2VVJ7ouQfA231ZrwTYg4DPEETN+1TBe4JFQtHGATdmzNmP3L6VFbUxeGMGJhxePQNJOc6oxdkjDJaFFOoAVRmIFtX3mg1YNgxJsuAYnMkKg4qfLo7s4+ji5/3g8ig53GhBhcmDwvUYVesxWKWVVyvKI4UcZGYkk2AETFiQDc300rzH+0KPrcSogE8EiRpGj9hLIGuXUgkglt1vqioHG9OsbLGsWdI1XJrChjY5CCuuY2Fwui2GnKgsyZZTtHrJZFTDxRkxK7ookkygPLlvcBRIVJO7S2+uXxO0tlnCRwYjGSS2keVxErKZZCz3LEg5V7Ry9oXAXWq7x+NklbPNI7t7zsWsPC+4eAqe2J0YL9Y06lBGmdlMgjKIqsWeTsOyXsAqkKW7R0Ck0HNTlczFQQlzlB3hb6A+NrVu7K2NiMSbQRO44sBaNbe85sq+pqwMJsXCQNFJJGyF3jgVIwZHfEEfSLGXJKIhzBn7xIsCoWzulGGDrLGZsQcLA5Y2kGXITGjgs2YvklEoAKtqGFxYUHHybKwkP8A6jGCR/8ADwgEhBvuaVvo1PMAMa1ZNqRrph8NHHyeT/qJPO7/AEa/woK6HaOx44c0UUUZd0yp1gZnjOQO7OzNlDJEUvkRbPKoF8pvrbL6Fu4u73PWLGEj0BZndA2dtwBjcmyMQtmtrQcxiJnkYu7FmO8nw0r6wuEklNoo3cjfkRnt52ByjxNd9BsOCNbx4VSSpaOSd1cS3EnVmMEhNciaZbkSDlW5tfHwoSZZMqhWyw6LcXUhCl1JzBEBZVIzFiDYmg4vAdGJpL5mRMpZSrHNJdC4bKo0NjHJvYD6Nzeyk1sY7Y+GhikJeSSRVXKSAkZLsAGUWJNiJlIJ0ML+FSOK6XRd4K8rnKS1jGqlYwhVSzOWUsZGKupv1m/SobHbUxe0ZI8Mqgs0hKIubvG93YkkADM5JAUasbUFg+xHBEQ4icjvyKgPMRKSSP4pCPSrRqK6O7ITCYaPDpqEWxPvMdWY+bEmpWopSlKBSlKCE2/0ehxajrBldQcjr3lvvH2lOlweQOhAIpnpV0LeBzmXLfuuusb+H2W8Pz1r9A1gxMCSKUdQytoQwuD5iiR+UcRA8Zyutj8j5HjWKrv6V9ALgvhlDrqWiJ7VucbE7xyJ9aqraWwXQkx3IG9WuHHhY8uRsao1MK3aQ8wPkSK6PbAvEPKuXg3p4XHwN/1rq9oi8A8v0oOMwn959z/yJW3iP7j7jfzmtbDf3v3P9aVs4gaQfcf+egktgYuOLExSyqzpG2cqtixKglQLkDv5T5CpTaXS6SRMTGsaqMVKHdiSzZECBI+VgqAHfe5rm71KdHtgTY2Ro4cgKrmZnJVQCbcASTfhbgaD42tt/FYkgzTM2UkqNFVSRY5QoAGml+VRYqw9ldBcIZ/2eXGNLKLlo4UIVLC9pHIYKfDQ+FbsceGhlh/Y8DA8bYpcMJZS0kjuL52iDXyotmGa+pB0trQV/s/YuJn/AHMDuOaqcv4jZfnXRp7Pp0jMmKljgQW3ZpXJY2ChFsGYkgABiSTVjYjpTh1j6xSzoJTDorHVELsygAlkCKzXAsdNbG9YMRtCL9tj69gi9SsmH6yyK0jlw510zqmRQN4DvbfQcnheimFwUZxmNchV1jiexYuBcZwvea+vVqSAN7HW01BNJHgurezh5QiqiLGzpGFaQMCzXd5A0ZYsdXBrk+k2Ikm2naUjJGc0al0CGOMF9GYhO2VsTf6wB7umxtXpXGqRIpDFEVLxtmdTmEjyhymQuZUhYAZh2Gue1QdngdoSQztBJGGigR5p8Qym3XTMX6uHwu5AGpI0Ou+EwOMhEbRvkzLHEqRFtGeHESEr4xo8fabdlQnjXKbc6cTTAKHfTczZEynmiILBuTsWI1y5TrXNLtGYxiBJHyAECNCQCGJJBVe8Lk7776CfXbcbSyyvI1wUEf0ZkLKsvWOzDMgBd1DMCw/eMNwraxHThwMmHiCKCCCW1zBAmayZSpyi3fI1PM1z+B2JipmyxxNfyLEX5qoLL6gV2OyvZTipLGZgg4gkA28AuYn1Kmg47GbfnfNmmZQ3eCWQH72W2f8AivTZGwcXiNMNhXcX3hcqDzY2X51dWxfZtgoCGZTI44nsgHw1zfFjXYwQoihUVVUbgoAA9BQimtleyPFPY4nEJEPdQGRreZyqp/FVkdF+iGFwCnqlJdtGkchnYcr2AA8ABXR0qKUpSgUpSgUpSgUpSgVC7b6PQYkdtbNwddG9feHnU1SgoHpr0TxGGPWGMOqk9tAbOh5j6rjiDvGoO8DT/aEfDAq19K/Q7oCCCAQd4Ooqvekfs3icvLg7Rs2rRnRCeJT3SeIN1Nh3d9WpFIQb5fuf+RKz4ru4c/Zf+as+2dkTYOZo54ymdSAT3W1BBB3HUCo/FTXSMe4WHo1j+hoM967vo7M2E2W86uI5MVMsEch0EaAlWcnhl+mN+Fga4KN7iuvHTuSPDx4aKCFUjUC7r1rFhqXANlUlix7p30HZdEsJLEMQuHkklgZSmGdlUK0ojZnnZgB2C5Chzct42vUREscMMMeMxcMLYeNo0SFjPIGlP0szBAbSFLqu8LmZrndXEY3pDi8Scsk8sn2FJy2+4gC29KbN2Bi5/wB1CSL207RHmqAlf4gKDq5+lWCiDJDBNOCX1ncIlpFjUiyDMQEjVRe2hYbjURtzpxisQpR3jRDvRY0I+LhmHmCKmtmeyrFyWMzhB4sqm3kue/xWuw2T7L8LFZpHZ2G/KoQH1bPIPRxQilY4JGF0jOX3jZE1+01l+dT+y+g+Mn1EbAfZQ2t4O5RD/CzVfGA2FhoTeOFA3vEZn9Xa7H41J1CKk2T7I9b4h1tyuzn5ZF9CGFdlszoLgoQOwXIFu2QFPmiBYz+GuppRWGCBEUKiKqjcFAUDyA0rNSlApSlApSlApSlApSlApSlApSlApSlApSlBH7X2RBiozFiIlkQ8GG481O9T4iqq2z7HpAxOExCMhPcmupA5B1BzeqirlpQUbhvZBiyRmkRBx+kL6eH0Y+ddNsz2RYZNZpXkPgAPzuD+EVZlKDnMJ0MwMYAGHVgOD3ZdOOUnKPhU9HGqgKqhQNwAAA8gKy0oFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoP//Z"
                />
                <HeartIcon className={cx('heart-icon')} />
            </Link>
            <div className={cx('content')}>
                <Link className={cx('cart-link')} to="https://klbtheme.com/partdo/">
                    <span className={cx('cart-link-title')}>Pin 5S2P 5000mAh - Dòng xả cao - Chuyên máy công cụ</span>
                </Link>
                <div className={cx('cart-price')}>
                    <span className={cx('original-price')}>500.000 ₫</span>
                    <span className={cx('sale-price')}>$348.99</span>
                </div>
                <div className={cx('stock')}>
                    <CartBoxIcon />
                    <span className={cx('stock-title')}>Còn hàng</span>
                </div>
            </div>
        </div>
    );
}

export default CartProducts;
